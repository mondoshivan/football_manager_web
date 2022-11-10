import { NextFunction, Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import { LoginAuthDTO, RefreshTokenDTO, RegisterAuthDTO, TokensDTO } from "@football-manager/data-transfer";
import { tokenService, tokenFamilyService, userService } from "@football-manager/db-handler";
import AppHelper from "../../helpers/app";
import log from "@football-manager/log";
import { IRefreshTokenPayload } from "../../interfaces/refresh-token";

const authRouter = Router();

authRouter.post('/register', asyncHandler( async (req: Request, res: Response) => {
    const payload = req.body as RegisterAuthDTO;
    const exists = await userService.checkExists(payload.email);
    if (exists) {
        res.status(400).send('This email address already exists.');
    } else {
        await userService.create(payload);
        res.status(200).json({});
    }
}));

authRouter.get('/logout', asyncHandler( async (req: Request, res: Response) => {
    const accessToken = AppHelper.jwtFromHeader(req);

    if (!accessToken) {
        log.debug('/logout: access token in header is invalid');
        res.send(401).send('access token is invalid');
        return;
    }

    const signature = AppHelper.jwtSignature(accessToken);
    const [dbToken] = await tokenService.getBySignature(signature);
    await AppHelper.jwtInvalidateFamily(dbToken, { delete: true });
    res.status(200).json({});
}));

authRouter.post('/refresh', asyncHandler( async (req: Request, res: Response) => {
    const payload = req.body as RefreshTokenDTO;

    // get the token via signature
    const signature = AppHelper.jwtSignature(payload.refreshToken);
    const [dbRefreshToken] = await tokenService.getBySignature(signature);

    // token does not exist
    if (!dbRefreshToken) {
        log.debug('could not find refresh token via signature');
        res.send(401).send('refresh token is invalid');
        return;
    }

    // token reuse check
    if (!dbRefreshToken.valid) {
        log.debug('refresh token is invalid. invalidating the whole family now.');
        await AppHelper.jwtInvalidateFamily(dbRefreshToken);
        res.send(401).send('refresh token is invalid');
        return;
    }

    // validity check
    let tokenPayload;
    try {
        tokenPayload = AppHelper.jwtVerify(payload.refreshToken) as IRefreshTokenPayload;
    } catch (error) {
        log.debug('refresh token could not be verified: ', error);
        res.send(401).send('refresh token is invalid');
        return;
    }

    // generate new set of tokens
    const user = await userService.getById(tokenPayload.userId);
    const tokenFamily = await dbRefreshToken.getTokenFamily();
    const data = await AppHelper.jwtGenerateTokens(user, tokenFamily);
    res.status(200).json(data);
}))

authRouter.post('/login', asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body as LoginAuthDTO;
    const user = await userService.getByEmailAndPassword(payload.email, payload.password);

    if (!user) {
        res.status(401).json("Email address or password incorrect.");
    }
    else if (!user.confirmed) {
        res.status(401).json("The user exists, but is not confirmed.");
    } 
    else {
        const data = await AppHelper.jwtGenerateTokens(user);
        res.status(200).json(data);
    }
}));



export default authRouter;