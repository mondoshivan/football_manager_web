import { tokenService } from '@football-manager/db-handler';
import log from '@football-manager/log';
import express, { Request, Response, NextFunction } from 'express';
import AppHelper from '../helpers/app';

export const jwtValidation = async (req: express.Request, res: express.Response, next: NextFunction) => {
    
    // get the jwt from the http header
    const jwt = AppHelper.jwtFromHeader(req);

    if (jwt) {

        // get the signature from the jwt
        const signature = AppHelper.jwtSignature(jwt);

        if (!signature) {
            log.debug('jwtValidation: could not find refresh token via signature');
            res.status(401).json( AppHelper.jwtAuthResponse('access token is invalid'));
            return;
        }

        // get the db token via signature
        const [dbToken] = await tokenService.getBySignature(signature);

        // token does not exist
        if (!dbToken) {
            log.debug('jwtValidation: could not find refresh token via signature');
            res.status(401).json( AppHelper.jwtAuthResponse('access token is invalid'));
            return;
        }

        // token reuse check
        if (!dbToken.valid) {
            log.debug('jwtValidation: access token is invalid. removing the whole family now.');
            await AppHelper.jwtInvalidateFamily(dbToken, { delete: true });
            res.status(401).json( AppHelper.jwtAuthResponse('access token is invalid'));
            return;
        }

        try {
            AppHelper.jwtValid(jwt);
            next();
        } catch (error) {
            res.status(401).json( AppHelper.jwtAuthResponse('access token is invalid'));
        }
    } else {
        res.status(401).json( AppHelper.jwtAuthResponse('access token is invalid'));
    }
}