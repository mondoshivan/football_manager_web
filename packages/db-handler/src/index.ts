import log from '@football-manager/log';

import { config } from "./config/config.js";
import sequelizeConnection from './connection.js';

import { BaseService } from './services/base.js';
import { App } from './models/app.js';
import { BaseDal } from './data-access-layer/base.js';
import { Championship } from './models/championship.js';
import { ChampionshipService } from './services/championship.js';
import { Calendar, Formation, Occurrence, Player, Skill, Team, Token, TokenFamily, User } from './models/index.js';
import { OccurrenceService } from './services/occurrence.js';
import { TeamService } from './services/team.js';
import { TokenService } from './services/token.js';
import { UserService } from './services/user.js';

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

const calendarDal = new BaseDal<Calendar>(Calendar);
const calendarService = new BaseService<Calendar>(calendarDal);

const championshipDal = new BaseDal<Championship>(Championship);
const championshipService = new ChampionshipService(championshipDal);

const formationDal = new BaseDal<Formation>(Formation);
const formationService = new BaseService<Formation>(formationDal);

const occurrenceDal = new BaseDal<Occurrence>(Occurrence);
const occurrenceService = new OccurrenceService(occurrenceDal);

const playerDal = new BaseDal<Player>(Player);
const playerService = new BaseService<Player>(playerDal);

const skillDal = new BaseDal<Skill>(Skill);
const skillService = new BaseService<Skill>(skillDal);

const teamDal = new BaseDal<Team>(Team);
const teamService = new TeamService(teamDal);

const tokenDal = new BaseDal<Token>(Token);
const tokenService = new TokenService(tokenDal);

const tokenFamilyDal = new BaseDal<TokenFamily>(TokenFamily);
const tokenFamilyService = new BaseService<TokenFamily>(tokenFamilyDal);

const userDal = new BaseDal<User>(User);
const userService = new UserService(userDal);

export { 
  appService,
  calendarService,
  championshipService,
  formationService,
  occurrenceService,
  playerService,
  skillService,
  teamService,
  tokenService,
  tokenFamilyService,
  userService
}