import { NextFunction, Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import { LoginAuthDTO, RegisterAuthDTO, TokenDTO } from "@football-manager/data-transfer";
import { userService } from "@football-manager/db-handler";
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
    } catch (error) {
        log.debug('refresh token is invalid', error);
        res.send(401).send('refresh token is invalid');
        return;
    }   

    const user = await userService.getById(tokenPayload.id);
    res.status(200).json(AppHelper.jwtResponseData(user));
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
        res.status(200).json(AppHelper.jwtResponseData(user));
    }
}));



export default authRouter;