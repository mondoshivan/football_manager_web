import { DataTypes, ForeignKey, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Championship from './championship';

interface ClubAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface ClubInput extends Optional<ClubAttributes, 'id'> {}
export interface ClubOutput extends Required<ClubAttributes> {}

class Club extends Model<ClubAttributes, ClubInput> implements ClubAttributes {
    public id!: number
    public name!: string
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    // declare championshipId: ForeignKey<Championship['id']>;
  }
  
  Club.init({
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
  
  export default Club