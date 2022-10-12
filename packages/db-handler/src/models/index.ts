import Championship from './championship'
import Club from './club'

Championship.hasMany(Club, {
  foreignKey: {
    name: 'championshipId'
  },
  as: 'clubs'
});

Club.belongsTo(Championship, {
  as: 'championship'
});

export {
  Championship,
  Club
}