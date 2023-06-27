import log from '@football-manager/log';

import { config } from "./config/config.js";
import { sequelize } from './connection.js';

import { BaseService } from './services/base.js';
import { App } from './models/app.model.js';
import { BaseDal } from './data-access-layer/base.js';
import { Championship } from './models/championship.model.js';
import { ChampionshipService } from './services/championship.js';
import { Calendar } from './models/calendar.model.js';
import { Formation } from './models/formation.model.js';
import { Occurrence } from './models/occurrence.model.js';
import { Player } from './models/player.model.js';
import { Skill } from './models/skill.model.js';
import { Team } from './models/team.model.js';
import { Token } from './models/token.model.js';
import { TokenFamily } from './models/token-family.model.js';
import { User } from './models/user.model.js';
import { OccurrenceService } from './services/occurrence.js';
import { TeamService } from './services/team.js';
import { TokenService } from './services/token.js';
import { UserService } from './services/user.js';

export const dbInit = async () => {

  try {
    await sequelize.sync({ 
      force: config.db.force, 
      alter: false 
    });

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