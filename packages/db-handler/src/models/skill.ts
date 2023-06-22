import { Association, DataTypes, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManySetAssociationsMixin, Model, NonAttribute, Optional } from 'sequelize'
import sequelizeConnection from '../connection'

export type SkillTypes = 'physical' | 'mental';

interface SkillAttributes {
  id: number;
  name: string;
  type: SkillTypes;
  description: string;
  required: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface SkillInput extends Optional<SkillAttributes, 'id'> {}

class Skill extends Model<SkillAttributes, SkillInput> implements SkillAttributes {
    public id!: number
    public name!: string
    public type!: SkillTypes
    public description!: string
    public required!: boolean
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }
  
  Skill.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('physical', 'mental'),
      allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    required: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  })
  
  export default Skill