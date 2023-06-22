import { Calendar } from './calendar';
import { Championship } from './championship';
import Occurrence from './occurrence';
import { Formation } from './formation';
import { App } from './app';
import Team from './team';
import Player from './player';
import Skill from './skill';
import PlayerSkill from './player_skill';
import TeamPlayer from './team-player';
import User from './user'
import TokenFamily from './token-family';
import Token from './token';

Calendar.hasMany(Occurrence);
Occurrence.belongsTo(Calendar);

Team.belongsToMany(Calendar, {
  through: 'TeamCalandar'
});
Calendar.belongsToMany(Team, {
  through: 'TeamCalandar'
});

Formation.hasMany(Team);
Team.belongsTo(Formation);

TokenFamily.hasMany(Token);
Token.belongsTo(TokenFamily);

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
  TeamPlayer,
  TokenFamily,
  User
}