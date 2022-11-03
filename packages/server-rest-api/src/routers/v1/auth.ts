import { NextFunction, Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import { LoginAuthDTO, RegisterAuthDTO } from "@football-manager/data-transfer";
import { userService } from "@football-manager/db-handler";
import AppHelper from "../../helpers/app";

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
    res.status(200).json({});
}));

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
        const token = AppHelper.jwt({
            name: user.name,
            email: user.email,
            role: user.role,
            id: user.id,
            confirmed: user.confirmed
        });

        res.status(200).json({ jwt: token });
    }
}));



export default authRouter;