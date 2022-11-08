import { NextFunction, Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import { LoginAuthDTO, RegisterAuthDTO, TokenDTO } from "@football-manager/data-transfer";
import { tokenService, tokenFamilyService, userService } from "@football-manager/db-handler";
import AppHelper from "../../helpers/app";
import log from "@football-manager/log";
import { IRefreshToken } from "../../interfaces/refresh-token";

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
    // todo: what here?
    // - Refresh Token needs to be invalidated
    res.status(200).json({});
}));

authRouter.post('/refresh', asyncHandler( async (req: Request, res: Response) => {
    const payload = req.body as TokenDTO;
    let tokenPayload;

    try {
        tokenPayload = AppHelper.jwtVerify(payload.refreshToken) as IRefreshToken;
        const refreshToken = await refreshTokenService.getById(tokenPayload.refreshTokenId);
        if (!refreshToken.valid) throw new Error('refresh token is invalid');
    } catch (error) {
        log.debug('refresh token is invalid', error);
        res.send(401).send('refresh token is invalid');
        return;
    }   

    const user = await userService.getById(tokenPayload.userId);
    const oldRefreshToken = await refreshTokenService.getById(tokenPayload.refreshTokenId);
    oldRefreshToken.valid = false;
    const newRefreshToken = await refreshTokenService.create({});
    const [tokenFamily] = await oldRefreshToken.getTokenFamily();
    newRefreshToken.setTokenFamily(tokenFamily);
    res.status(200).json(AppHelper.jwtResponseData(user, newRefreshToken.id));
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
        // generate the response data
        const data = AppHelper.jwtResponseData(user);

        // get the token signatures
        const refreshTokenSignature = AppHelper.jwtSignature(data.refreshToken);
        const accessTokenSignature = AppHelper.jwtSignature(data.accessToken);

        // create the token family in db 
        const tokenFamily = await tokenFamilyService.create({});

        // create the tokens in db
        const dbRefreshToken = await tokenService.create({ signature: refreshTokenSignature, type: 'refresh' });
        const dbAccessToken = await tokenService.create({ signature: accessTokenSignature, type: 'access' });

        // add the tokens to the family
        dbRefreshToken.setTokenFamily(tokenFamily);
        dbAccessToken.setTokenFamily(tokenFamily);

        res.status(200).json(data);
    }
}));



export default authRouter;