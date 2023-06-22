import { BelongsToCreateAssociationMixin, BelongsToManyAddAssociationMixin, DataTypes, HasManyAddAssociationMixin, HasManySetAssociationsMixin, HasOneSetAssociationMixin, Model, Optional } from 'sequelize'
import sequelizeConnection from '../connection'
import Calendar from './calendar';
import Championship, { ChampionshipCreationAttributes } from './championship';
import Formation from './formation';
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

    declare addChampionship: HasManyAddAssociationMixin<Championship, Championship['id']>;
    declare addPlayer: HasManyAddAssociationMixin<Player, Player['id']>;
    declare setFormation: HasManyAddAssociationMixin<Formation, Formation['id']>;
    declare addCalendar: BelongsToManyAddAssociationMixin<Calendar, Calendar['id']>;
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