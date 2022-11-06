import express, { Express, Router, Request, Response, NextFunction, RequestHandler } from 'express';
import boolParser from 'express-query-boolean';
import expressSession from 'express-session';
import SessionFileStore from 'session-file-store';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import CryptoJS from 'crypto-js';
import path from 'path';
import { v4 } from 'uuid';

import log from '@football-manager/log';
import config from "./config/config";
import AppHelper from './helpers/app';
import User, { UserInput } from '@football-manager/db-handler/src/models/user';

const FileStore = SessionFileStore(expressSession);

type UserNew = {
  id: string
  username: string
}
 
export class App {

  private app: Express = express();;
  private port: number;
  private apiVersion: number;
 
  constructor(apiVersion:number, routers: Router, port:number) {
    this.port = port;
    this.apiVersion = apiVersion;
 
    this.preInitialize();
    this.initializeMiddlewares();
    this.initializeRouters(routers);
  }

  private preInitialize() {
    // this.initializePassport();
  }
 
  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(boolParser());
    // this.app.use(expressSession(this.expressSessionConfig()));
    this.app.use(express.static(path.join(process.cwd(), config.service.frontEndDir)));
    // this.app.use(passport.initialize());
    // this.app.use(passport.session());

    this.app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
      log.error(err);
      res.status(500).send('Internal Server Error!');
    });
  }

  private expressSessionConfig() {
    return {
      resave: false,
      saveUninitialized: true,
      secret: config.service.sessionSecret,
      store: new FileStore,
      cookie: {
        secure: config.service.sessionCookieSecure
      },
      genid: (req: any) => {
        log.debug(`sessionId middleware: ${req.sessionID}`);
        return v4();
      }
    }
  }

  // must be done before configuring the middleware
  private initializePassport() {
    passport.use(new LocalStrategy.Strategy(AppHelper.passportStrategy));

    // used to serialize the user for the session
    passport.serializeUser<any, any>((req, user, done) => {
      done(undefined, user);
    });

    // passport.serializeUser((user: UserNew, done) => {
    //   console.log("serializeUser", user)
    //   done(null, user.id)
    // })

    // used to deserialize the user
    passport.deserializeUser(AppHelper.deserializeUser);
  }
 
  private initializeRouters(routers: Router) {
    this.app.use(`/api/${this.apiVersion}`, routers);
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      log.info(`App listening on the port ${this.port}`);
    });
  }
}
