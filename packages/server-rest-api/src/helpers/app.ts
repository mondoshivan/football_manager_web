import LocalStrategy from 'passport-local';
import { userService } from '@football-manager/db-handler';
import CryptoJS from 'crypto-js';
import jwt from "jsonwebtoken";
import User from '@football-manager/db-handler/src/models/user';
import config from "../config/config";


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

    static jwt(body: any, options?: jwt.SignOptions) {
        return jwt.sign(body, 
            config.service.jwtSecret,
            {
                ...{ 
                    expiresIn: 60 * 15 // seconds 
                },
                ...options
            }
        );
    }

    static jwtValid(token: string) : boolean{
        return !!jwt.verify(token, config.service.jwtSecret);
    }

    static jwtFromHeader(header: string | undefined) : string | undefined{
        if (!header) return undefined;

        if (/^Bearer\s+[\w-]+\.[\w-]+\.[\w-]+$/.test(header)) {
            return header.replace(/Bearer\s+/, '');
        }
        return undefined;
    }
}

export default AppHelper;