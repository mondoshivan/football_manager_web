import log from '@football-manager/log';

import { config } from "./config/config";
import { sequelize } from './connection';

import { BaseService } from './services/base';
import { App } from './models/app.model';
import { BaseDal } from './data-access-layer/base';
import { Championship } from './models/championship.model';
import { ChampionshipService } from './services/championship';
import { Calendar } from './models/calendar.model';
import { Formation } from './models/formation.model';
import { Occurrence } from './models/occurrence.model';
import { Player } from './models/player.model';
import { Skill } from './models/skill.model';
import { Team } from './models/team.model';
import { Token } from './models/token.model';
import { TokenFamily } from './models/token-family.model';
import { User } from './models/user.model';
import { OccurrenceService } from './services/occurrence';
import { TeamService } from './services/team';
import { TokenService } from './services/token';
import { UserService } from './services/user';

export const dbInit = async () => {

  try {
    await sequelize.sync({
      force: config.db.force,
      alter: true
    });

    // this needs to be done even though
    // the models are loaded in the connection.
    // otherwise the models are not available
    // in the sequelize instance.
    sequelize.addModels([
      App,
      Calendar,
      Championship,
      Formation,
      Occurrence,
      Player,
      Skill,
      Team,
      Token,
      TokenFamily,
      User
    ]);

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