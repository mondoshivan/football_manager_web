import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface TeamAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface TeamInput extends Optional<TeamAttributes, 'id'> {}
export interface TeamOutput extends Required<TeamAttributes> {}

class Team extends Model<TeamAttributes, TeamInput> implements TeamAttributes {
    public id!: number
    public name!: string
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
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
  })
  
  export default Team