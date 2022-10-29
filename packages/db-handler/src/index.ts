import log from '@football-manager/log';

import config from "./config/config";
import sequelizeConnection from './config';

import * as calendarService from './services/calendar'
import * as championshipService from './services/championship'
import * as occurrenceService from './services/occurrence'
import * as formationService from './services/formation'
import * as gameService from './services/game'
import * as playerService from './services/player'
import * as skillService from './services/skill'
import * as teamService from './services/team'

const alter = false;

export const dbInit = async () => {

  try {
    await sequelizeConnection.sync({ force: config.db.force, alter: alter });
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
  teamService
}