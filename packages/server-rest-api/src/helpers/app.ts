import LocalStrategy from 'passport-local';
import { tokenFamilyService, tokenService, userService } from '@football-manager/db-handler';
import CryptoJS from 'crypto-js';
import jwt from "jsonwebtoken";
import User from '@football-manager/db-handler/src/models/user';
import config from "../config/config";
import { IRefreshTokenPayload } from '../interfaces/refresh-token';
import { Request } from 'express';
import Token from '@football-manager/db-handler/src/models/token';
import { TokensDTO } from '@football-manager/data-transfer';
import TokenFamily from '@football-manager/db-handler/src/models/token-family';

export type JWTInvalidateFamilyOptions = {
    delete: boolean       
}

class AppHelper {

    static serializeUser(user: User, done: (err: any, id?: unknown) => void) {
        done(null, user.id); 
    }

    static deserializeUser(
        id: number, 
        done: (err: any, user?: false | Express.User | null | undefined) => void
    ) {
        userService.getById(id).then((user) => {
            if (!user) done(new Error('could not find user'));

            done(null, user);
        }).catch((error) => {
            done(error, false);
        });
    }

    static passportStrategy(
        email: string,
        password: string,
        cb: (error: any, user?: any, options?: LocalStrategy.IVerifyOptions | undefined) => void
    ) {
        userService.getAll({ email: email}).then((users) => {
            if (users.length !== 1) return cb(new Error('Multiple occurrences'));

            const user = users[0];

            if (!user) return cb(new Error('Incorrect email or password'));

            const hash = CryptoJS.SHA256(`${password}${user.salt}`).toString();

            if (user.password !== hash) return cb(null, false, { 
                message: 'Incorrect username or password.' 
            });

            return cb(null, user);
        }).catch((error) => {
            return cb(error);
        });
    }

    static accessToken(body: any, options?: jwt.SignOptions) {
        return AppHelper.jwt( { ...body, ...{ type: 'access'} }, options);
    }

    static refreshToken(body: IRefreshTokenPayload, options?: jwt.SignOptions) {
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

    static jwtSignature(token: string): string {
        return token.split('.')[2];
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
        const dbRefreshToken = await tokenService.create({ signature: refreshTokenSignature, type: 'refresh' });
        const dbAccessToken = await tokenService.create({ signature: accessTokenSignature, type: 'access' });

        // add the tokens to the family
        dbRefreshToken.setTokenFamily(tokenFamily);
        dbAccessToken.setTokenFamily(tokenFamily);

        return data;
    }

    static jwtResponseData(user: User): TokensDTO {
        return { 
            accessToken: AppHelper.accessToken({
                name: user.name,
                email: user.email,
                role: user.role,
                id: user.id,
                confirmed: user.confirmed
            }),
            refreshToken: AppHelper.refreshToken({
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
}

export default AppHelper;