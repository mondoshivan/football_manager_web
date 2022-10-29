import { Association, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, Model, NonAttribute, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Calendar from './calendar';
import Team from './team';

export type ChampionshipTypes = 'league' | 'cup';

interface ChampionshipAttributes {
  id: number;
  name: string;
  type: ChampionshipTypes;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface ChampionshipInput extends Optional<ChampionshipAttributes, 'id'> {}

class Championship extends Model<ChampionshipAttributes, ChampionshipInput> implements ChampionshipAttributes {
    public id!: number;
    public name!: string;
    public type!: ChampionshipTypes;
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    declare getTeams: HasManyGetAssociationsMixin<Team>;

    declare getCalendars: BelongsToManyGetAssociationsMixin<Calendar>;
    declare addCalendar: BelongsToManyAddAssociationMixin<Calendar, Calendar['id']>;
    
    // declare addClub: HasManyAddAssociationMixin<Club, number>;
    // declare addClubs: HasManyAddAssociationsMixin<Club, number>;
    // declare setClubs: HasManySetAssociationsMixin<Club, number>;
    // declare removeClub: HasManyRemoveAssociationMixin<Club, number>;
    // declare removeClubs: HasManyRemoveAssociationsMixin<Club, number>;
    // declare hasClub: HasManyHasAssociationMixin<Club, number>;
    // declare hasClubs: HasManyHasAssociationsMixin<Club, number>;
    // declare countClubs: HasManyCountAssociationsMixin;
    // declare createClub: HasManyCreateAssociationMixin<Club, 'name'>;

    // declare clubs?: NonAttribute<Club[]>;

    // declare static associations: {
    //     clubs: Association<Championship, Club>;
    // };
  }
  
  Championship.init({
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
      type: DataTypes.ENUM('league', 'cup'),
      allowNull: false
    }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: false
  });
  
  export default Championship