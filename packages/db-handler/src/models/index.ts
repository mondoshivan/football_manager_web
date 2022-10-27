import Calendar from './calendar';
import Championship from './championship';
import Formation from './formation';
import Team from './team';
import Player from './player';
import Skill from './skill';
import PlayerSkill from './player_skill';
import TeamPlayer from './team_player';

Team.belongsTo(Calendar);
Calendar.belongsTo(Team);

Formation.hasMany(Team);
Team.belongsTo(Formation);

Championship.belongsToMany(Team, {
  through: 'ChampionshipTeam'
});

Team.belongsToMany(Championship, {
  through: 'ChampionshipTeam'
});

export {
  Calendar,
  Championship,
  Formation,
  Player,
  PlayerSkill,
  Skill,
  Team,
  TeamPlayer
}