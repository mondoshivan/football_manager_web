import { DataTypes, HasManyAddAssociationMixin, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface FormationAttributes {
  id: number;
  name: string;
  description: string;
  defender: number;
  midfielder: number;
  forward: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface FormationInput extends Optional<FormationAttributes, 'id'> {}

class Formation extends Model<FormationAttributes, FormationInput> implements FormationAttributes {
    public id!: number
    public name!: string
    public description!: string;
    public defender!: number;
    public midfielder!: number;
    public forward!: number;
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }
  
  Formation.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      defender: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      midfielder: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      forward: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  });
  
  export default Formation