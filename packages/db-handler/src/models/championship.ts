import { Association, DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, Model, NonAttribute, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Club from './club';

interface ChampionshipAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface ChampionshipInput extends Optional<ChampionshipAttributes, 'id'> {}
export interface ChampionshipOutput extends Required<ChampionshipAttributes> {}

class Championship extends Model<ChampionshipAttributes, ChampionshipInput> implements ChampionshipAttributes {
    public id!: number
    public name!: string
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    // declare getClubs: HasManyGetAssociationsMixin<Club>;
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
    }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: false
  });

  Championship.hasMany(Club, {
    foreignKey: {
      name: 'championshipId'
    },
    as: 'clubs'
  });
  
  Club.belongsTo(Championship, {
    as: 'championship'
  });
  
  export default Championship