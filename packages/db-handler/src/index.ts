import log from '@football-manager/log';

import config from "./config/config";
import sequelizeConnection from './connection';

import { BaseService } from './services/base';
import { App } from './models/app';
import { BaseDal } from './data-access-layer/base';
import { Championship } from './models/championship';
import { ChampionshipService } from './services/championship';

export const dbInit = async () => {

  try {
    await sequelizeConnection.sync({ 
      force: config.db.force, 
      alter: false 
    });
    const models = sequelizeConnection.models;
  } catch (error) {
    log.fatal(error);
  }
}

const appDal = new BaseDal<App>(App);
const appService = new BaseService<App>(appDal);

const championshipDal = new BaseDal<Championship>(Championship);
const championshipService = new ChampionshipService(championshipDal);

export { 
  appService,
  championshipService
}