import Championship from './championship'
import Team from './team'
import Player from './player'
import TeamPlayer from './team_player'

Championship.belongsToMany(Team, {
  through: 'ChampionshipTeam'
});

Team.belongsToMany(Championship, {
  through: 'ChampionshipTeam'
});

export {
  Championship,
  Player,
  Team,
  TeamPlayer
}