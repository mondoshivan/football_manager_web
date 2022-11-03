import express, { Request, Response, NextFunction } from 'express';
import AppHelper from '../helpers/app';

export const jwtValidation = (req: express.Request, res: express.Response, next: NextFunction) => {
    const token = AppHelper.jwtFromHeader(req.headers["authorization"]);

    if (token) {
        try {
            AppHelper.jwtValid(token);
            req.authorized = true;
            next();
        } catch (error) {
            res.send(401).send('token is invalid');
        }
    } else {
        res.send(401).send('token is invalid');
    }
}