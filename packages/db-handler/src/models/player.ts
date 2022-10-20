import { Association, DataTypes, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, Model, NonAttribute, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Team, { TeamInput } from './team';

interface PlayerAttributes {
  id: number;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface PlayerInput extends Optional<PlayerAttributes, 'id'> {
  teams?: TeamInput[];
}

export interface PlayerOutput extends Required<PlayerAttributes> {}

class Player extends Model<PlayerAttributes, PlayerInput> implements PlayerAttributes {
    public id!: number
    public firstName!: string
    public lastName!: string
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }
  
  Player.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: false
  })
  
  export default Player