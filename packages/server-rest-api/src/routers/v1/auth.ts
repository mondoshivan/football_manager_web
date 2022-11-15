import { NextFunction, Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import { LoginAuthDTO, RefreshTokenDTO, RegisterAuthDTO, TokensDTO } from "@football-manager/data-transfer";
import { tokenService, tokenFamilyService, userService } from "@football-manager/db-handler";
import AppHelper from "../../helpers/app";
import log from "@football-manager/log";
import { IRefreshTokenPayload } from "../../interfaces/refresh-token";
import { sign } from "crypto";

const authRouter = Router();

authRouter.post('/register', asyncHandler( async (req: Request, res: Response) => {
    const payload = req.body as RegisterAuthDTO;
    const exists = await userService.checkExists(payload.email);
    if (exists) {
        res.status(400).json( AppHelper.jwtAuthResponse('This email address already exists.'));
    } else {
        await userService.create(payload);
        res.status(200).json({ message: 'done' });
    }
}));

authRouter.get('/logout', asyncHandler( async (req: Request, res: Response) => {
    const accessToken = AppHelper.jwtFromHeader(req);

    if (!accessToken) {
        log.debug('/logout: access token in header is invalid');
        res.status(401).json( AppHelper.jwtAuthResponse('access token is invalid.'));
        return;
    }

    const signature = AppHelper.jwtSignature(accessToken);

    if (!signature) {
        log.debug('/logout: access token not found in db via signature');
        res.status(200).json( AppHelper.jwtAuthResponse('ok'));
        return;
    }

    const [dbToken] = await tokenService.getBySignature(signature);

    if (!dbToken) {
        log.debug('/logout: access token not found in db via signature');
        res.status(200).json( AppHelper.jwtAuthResponse('ok'));
        return;
    }

    await AppHelper.jwtInvalidateFamily(dbToken, { delete: true });
    res.status(200).json( AppHelper.jwtAuthResponse('done'));
}));

authRouter.post('/refresh', asyncHandler( async (req: Request, res: Response) => {
    const payload = req.body as RefreshTokenDTO;

    // get the token via signature
    const signature = AppHelper.jwtSignature(payload.refreshToken);

    if (!signature) {
        log.debug('/refresh: could not find refresh token via signature');
        res.status(401).json( AppHelper.jwtAuthResponse('refresh token is invalid', { logout: true }));
        return;
    }

    const [dbRefreshToken] = await tokenService.getBySignature(signature);

    // token does not exist
    if (!dbRefreshToken) {
        log.debug('/refresh: could not find refresh token via signature');
        res.status(401).json( AppHelper.jwtAuthResponse('refresh token is invalid', { logout: true }));
        return;
    }

    // token reuse check
    if (!dbRefreshToken.valid) {
        log.debug('/refresh: refresh token is invalid. removing the whole family now.');
        await AppHelper.jwtInvalidateFamily(dbRefreshToken, { delete: true });
        res.status(401).json( AppHelper.jwtAuthResponse('refresh token is invalid', { logout: true }));
        return;
    }

    // validity check
    let tokenPayload;
    try {
        tokenPayload = AppHelper.jwtVerify(payload.refreshToken) as IRefreshTokenPayload;
    } catch (error) {
        log.debug('/refresh: refresh token could not be verified: ', error);
        await AppHelper.jwtInvalidateFamily(dbRefreshToken);
        res.status(401).json( AppHelper.jwtAuthResponse('refresh token is invalid', { logout: true }));
        return;
    }

    // generate new set of tokens
    const user = await userService.getById(tokenPayload.userId);
    const tokenFamily = await dbRefreshToken.getTokenFamily();
    await AppHelper.jwtInvalidateFamily(dbRefreshToken);
    const data = await AppHelper.jwtGenerateTokens(user, tokenFamily);
    res.status(200).json(data);
}))

authRouter.post('/login', asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body as LoginAuthDTO;
    const user = await userService.getByEmailAndPassword(payload.email, payload.password);

    if (!user) {
        // sending 400, because 401 is used for refresh token rotation
        res.status(400).json({ message: "Email address or password incorrect." });
        res.status(400).json( AppHelper.jwtAuthResponse('Email address or password incorrect.'));
    }
    else if (!user.confirmed) {
        // sending 400, because 401 is used for refresh token rotation
        res.status(400).json( AppHelper.jwtAuthResponse('The user exists, but is not confirmed.'));
    } 
    else {
        const data = await AppHelper.jwtGenerateTokens(user);
        res.status(200).json(data);
    }
}));



export default authRouter;