import log from '@football-manager/log';

import config from "./config/config";
import sequelizeConnection from './config';

import * as calendarService from './services/calendar'
import * as championshipService from './services/championship'
import * as occurrenceService from './services/occurrence'
import * as formationService from './services/formation'
import * as gameService from './services/game'
import * as playerService from './services/player'
import * as tokenService from './services/token'
import * as skillService from './services/skill'
import * as tokenFamilyService from './services/token-family'
import * as teamService from './services/team'
import * as userService from './services/user'

const alter = false;

export const dbInit = async () => {

  try {
    await sequelizeConnection.sync({ force: config.db.force, alter: alter });
    const models = sequelizeConnection.models;

  } catch (error) {
    log.fatal(error);
  }
}

export { 
  calendarService,
  championshipService,
  occurrenceService,
  formationService,
  gameService,
  skillService,
  playerService,
  tokenService,
  teamService,
  tokenFamilyService,
  userService
}