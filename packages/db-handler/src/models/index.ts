import Calendar from './calendar';
import CalendarOccurrence from './calendar_occurrence';
import Championship from './championship';
import Occurrence from './occurrence';
import Formation from './formation';
import Game from './game';
import Team from './team';
import Player from './player';
import Skill from './skill';
import PlayerSkill from './player_skill';
import TeamPlayer from './team_player';

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
  Calendar,
  CalendarOccurrence as CalendarEvent,
  Championship,
  Occurrence,
  Formation,
  Game,
  Player,
  PlayerSkill,
  Skill,
  Team,
  TeamPlayer
}