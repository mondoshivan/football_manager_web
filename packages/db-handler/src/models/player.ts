import { Association, BelongsToManyAddAssociationMixin, DataTypes, HasManyAddAssociationMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManySetAssociationsMixin, Model, NonAttribute, Optional } from 'sequelize'
import sequelizeConnection from '../connection'
import { PlayerSkillAttributes } from './player_skill';
import Skill from './skill';
import Team, { TeamInput } from './team';

interface PlayerAttributes {
  id: number;
  firstName: string;
  secondName: string;
  birthday: Date;
  height: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface PlayerInput extends Optional<PlayerAttributes, 'id'> {
  // teams?: TeamInput[];
}

class Player extends Model<PlayerAttributes, PlayerInput> implements PlayerAttributes {
    public id!: number
    public firstName!: string
    public secondName!: string
    public birthday!: Date;
    public height!: number;
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    declare setTeams: HasManySetAssociationsMixin<Team, number>;
    declare addSkill: BelongsToManyAddAssociationMixin<Skill, Skill['id']>;

    declare teams: NonAttribute<Team[]>;
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
    secondName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false
    },
    height: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false
    }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  })
  
  export default Player