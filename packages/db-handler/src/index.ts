import log from '@football-manager/log';

import sequelizeConnection from './config';

import * as championshipService from './services/championship'
import * as formationService from './services/formation'
import * as playerService from './services/player'
import * as skillService from './services/skill'
import * as teamService from './services/team'

const force = true;
const alter = false;

export const dbInit = async () => {

  try {
    await sequelizeConnection.sync({ force: force, alter: alter });
  } catch (error) {
    log.fatal(error);
  }
}

export { 
  championshipService,
  formationService,
  skillService,
  playerService,
  teamService
}