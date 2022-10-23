import { DataTypes, HasManyAddAssociationMixin, HasManySetAssociationsMixin, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Championship, { ChampionshipInput } from './championship';
import Player from './player';

interface TeamAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface TeamInput extends Optional<TeamAttributes, 'id'> {}

class Team extends Model<TeamAttributes, TeamInput> implements TeamAttributes {
    public id!: number
    public name!: string
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    declare addChampionship: HasManyAddAssociationMixin<Championship, number>;
    declare addPlayer: HasManyAddAssociationMixin<Player, number>;
  }
  
  Team.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  });
  
  export default Team