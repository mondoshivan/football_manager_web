import log from '@football-manager/log';

import { Club, Championship, Team, Player } from './models/index'
import * as clubService from './services/club'
import * as championshipService from './services/championship'
import * as playerService from './services/player'
import * as teamService from './services/team'

const isDev = process.env.NODE_ENV === 'development';

export const dbInit = async () => {

  try {
    await Championship.sync({ alter: isDev });
    await Club.sync({ alter: isDev });
    await Team.sync({ alter: isDev });
    await Player.sync({ alter: isDev });
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