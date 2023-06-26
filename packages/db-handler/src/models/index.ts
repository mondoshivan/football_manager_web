import { Calendar } from './calendar.js';
import { Championship } from './championship.js';
import { Occurrence } from './occurrence.js';
import { Formation } from './formation.js';
import { App } from './app.js';
import { Team } from './team.js';
import { Player } from './player.js';
import { Skill } from './skill.js';
import { PlayerSkill } from './player_skill.js';
import { User } from './user.js'
import { TokenFamily } from './token-family.js';
import { Token } from './token.js';

Team.belongsToMany(Calendar, {
  through: 'TeamCalandar'
});
Calendar.belongsToMany(Team, {
  through: 'TeamCalandar'
});

Formation.hasMany(Team);
Team.belongsTo(Formation);

Championship.belongsToMany(Calendar, {
  through: 'ChampionshipCalendar'
});

Calendar.belongsToMany(Championship, {
  through: 'ChampionshipCalendar'
});

Championship.belongsToMany(Team, {
  through: 'ChampionshipTeam'
});

Team.belongsToMany(Championship, {
  through: 'ChampionshipTeam'
});

export {
  App,
  Calendar,
  Championship,
  Occurrence,
  Formation,
  Player,
  PlayerSkill,
  Token,
  Skill,
  Team,
  TokenFamily,
  User
}