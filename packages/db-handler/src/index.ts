import log from '@football-manager/log';

import { Club, Championship } from './models/index'
import * as clubService from './services/club'
import * as championshipService from './services/championship'

const isDev = process.env.NODE_ENV === 'development'

export const dbInit = async () => {

  try {
    await Championship.sync({ alter: isDev })
    await Club.sync({ alter: isDev })
  } catch (error) {
    log.fatal(error);
  }
}

export { 
  championshipService,
  clubService
}