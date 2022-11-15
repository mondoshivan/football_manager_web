import { tokenFamilyService, tokenService } from '@football-manager/db-handler';
import jwt from "jsonwebtoken";
import User from '@football-manager/db-handler/src/models/user';
import config from "../config/config";
import { IRefreshTokenPayload } from '../interfaces/refresh-token';
import { Request } from 'express';
import Token from '@football-manager/db-handler/src/models/token';
import { AuthResponseDTO, TokensDTO } from '@football-manager/data-transfer';
import TokenFamily from '@football-manager/db-handler/src/models/token-family';

export type JWTInvalidateFamilyOptions = {
    delete: boolean       
}

export type JWTAuthErrorOptions = {
    logout: boolean
}

class AppHelper {

    static jwtAccessToken(body: any, options?: jwt.SignOptions) {
        return AppHelper.jwt( { ...body, ...{ type: 'access'} }, options);
    }

    static jwtRefreshToken(body: IRefreshTokenPayload, options?: jwt.SignOptions) {
        return AppHelper.jwt( { ...body, ...{ type: 'refresh'} }, options);
    }

    static jwt(body: any, options?: jwt.SignOptions) {
        return jwt.sign(body, 
            config.service.jwtSecret,
            {
                ...{ 
                    expiresIn: 60 * 1 // seconds 
                },
                ...options
            }
        );
    }

    static jwtSignature(token: string): string | undefined {
        if (!token) return;
        const splitted = token.split('.');
        return splitted[2];
    }

    static async jwtInvalidateFamily(dbToken: Token, options?: JWTInvalidateFamilyOptions): Promise<void> {
        const tokenFamily = await dbToken.getTokenFamily();
        const tokens = await tokenFamily.getTokens();

        if (tokens) {
            for (const token of tokens) {
                if (options?.delete) {
                    await tokenService.deleteById(token.id);
                } else {
                    token.valid = false;
                    token.save();
                }
            }

            if (options?.delete) {
                tokenFamilyService.deleteById(tokenFamily.id);
            }
        }
    }

    static async jwtGenerateTokens(user: User, tokenFamily?: TokenFamily) {
        // generate the response data
        const data = AppHelper.jwtResponseData(user);

        // get the token signatures
        const refreshTokenSignature = AppHelper.jwtSignature(data.refreshToken);
        const accessTokenSignature = AppHelper.jwtSignature(data.accessToken);

        // create the token family in db 
        if (!tokenFamily) tokenFamily = await tokenFamilyService.create({});

        // create the tokens in db
        const dbRefreshToken = await tokenService.create({ signature: refreshTokenSignature!, type: 'refresh' });
        const dbAccessToken = await tokenService.create({ signature: accessTokenSignature!, type: 'access' });

        // add the tokens to the family
        dbRefreshToken.setTokenFamily(tokenFamily);
        dbAccessToken.setTokenFamily(tokenFamily);

        return data;
    }

    static jwtResponseData(user: User): TokensDTO {
        return { 
            accessToken: AppHelper.jwtAccessToken({
                name: user.name,
                email: user.email,
                role: user.role,
                id: user.id,
                confirmed: user.confirmed
            }),
            refreshToken: AppHelper.jwtRefreshToken({
                userId: user.id
            }, { 
                expiresIn: 60 * 60 * 24
            }) // 1 day
        };
    }

    static jwtVerify(token: string) : string | jwt.JwtPayload {
        return jwt.verify(token, config.service.jwtSecret);
    }

    static jwtValid(token: string) : boolean{
        return !!jwt.verify(token, config.service.jwtSecret);
    }

    static jwtFromHeader(req: Request) : string | undefined{
        const header = req.headers["authorization"];
        if (!header) return undefined;

        if (/^Bearer\s+[\w-]+\.[\w-]+\.[\w-]+$/.test(header)) {
            return header.replace(/Bearer\s+/, '');
        }
        return;
    }

    static jwtAuthResponse(message: string, options?: JWTAuthErrorOptions ): AuthResponseDTO {
        return {
            message: message,
            logout: !!options?.logout
        };
    }
}

export default AppHelper;