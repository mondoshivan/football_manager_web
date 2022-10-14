import express, { Express, Router } from 'express';
import path from 'path';

import log from '@football-manager/log';
import config from "./config/config";
 
export class App {

  private app: Express = express();;
  private port: number;
  private apiVersion: number;
 
  constructor(apiVersion:number, routers: { [key: string]: Router }, port:number) {
    this.port = port;
    this.apiVersion = apiVersion;
 
    this.initializeMiddlewares();
    this.initializeRouters(routers);
  }
 
  private initializeMiddlewares() {
    // the front-end
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(process.cwd(), config.service.frontEndDir)));
  }
 
  private initializeRouters(routers: { [key: string]: Router }) {
    for (const route in routers) {
        const router = routers[route];
        const apiRoute = path.join('/api', this.apiVersion.toString(), route);
        this.app.use(apiRoute, router);
    }
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      log.info(`App listening on the port ${this.port}`);
    });
  }
}
