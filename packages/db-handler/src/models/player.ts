import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface PlayerAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface PlayerInput extends Optional<PlayerAttributes, 'id'> {}
export interface PlayerOutput extends Required<PlayerAttributes> {}

class Player extends Model<PlayerAttributes, PlayerInput> implements PlayerAttributes {
    public id!: number
    public name!: string
  
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  })
  
  export default Player