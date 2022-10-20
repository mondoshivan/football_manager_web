import log from '@football-manager/log';

import sequelizeConnection from './config';

import * as clubService from './services/club'
import * as championshipService from './services/championship'
import * as playerService from './services/player'
import * as teamService from './services/team'

const isDev = process.env.NODE_ENV === 'production';
const force = true;
const alter = false;

export const dbInit = async () => {

  try {
    await sequelizeConnection.sync({ force: force, alter: alter });

    // await Championship.sync({ force: force, alter: alter });
    // await Club.sync({ force: force, alter: alter });
    // await Team.sync({ force: force, alter: alter });
    // await Player.sync({ force: force, alter: alter });
  } catch (error) {
    log.fatal(error);
  }
}

export { 
  championshipService,
  clubService,
  teamService,
  playerService
}