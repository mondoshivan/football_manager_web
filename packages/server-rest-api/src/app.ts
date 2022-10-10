import express, { Express } from 'express';
import path from 'path';

import { Controller } from './controller/controller';
import log from '@football-manager/log';
import config from "./config/config";

export interface ILoadController {
    route: string;
    version: number;
    controller: Controller
}
 
export class App {

  public app: Express = express();;
  public port: number;
 
  constructor(controllers:ILoadController[], port:number) {
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    // the front-end
    this.app.use(express.static(path.join(process.cwd(), config.service.frontEndDir)));
  }
 
  private initializeControllers(controllers:ILoadController[]) {
    for (const loadController of controllers) {
        const controller = loadController.controller;
        const route = path.join(loadController.route, loadController.version.toString());
        this.app.use(path.join(route, controller.path), controller.router);
    }
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      log.info(`App listening on the port ${this.port}`);
    });
  }
}
