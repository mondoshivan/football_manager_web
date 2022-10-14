import Championship from './championship'
import Club from './club'
import Team from './team'
import Player from './player'

Championship.hasMany(Club, {
  foreignKey: {
    name: 'championshipId'
  },
  as: 'clubs'
});

Club.belongsTo(Championship, {
  as: 'championship'
});

Player.belongsToMany(Team, {
  through: 'team_players',
  as: 'teams'
});

Team.belongsToMany(Player, {
  through: 'team_players',
  as: 'players'
});

export {
  Championship,
  Club,
  Player,
  Team
}