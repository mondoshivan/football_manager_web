import { DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import TokenFamily from './token-family';

export type TokenTypes = 'access' | 'refresh';

interface TokenAttributes {
  id: number;
  signature: string;
  type: TokenTypes;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface TokenInput extends Optional<TokenAttributes, 'id'> { }

class Token extends Model<TokenAttributes, TokenInput> implements TokenAttributes {
  public id!: number
  public signature!: string
  public type!: TokenTypes

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  declare setTokenFamily: HasManyAddAssociationMixin<TokenFamily, TokenFamily['id']>;
  declare getTokenFamily: HasManyGetAssociationsMixin<TokenFamily>;
}

Token.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  signature: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('access', 'refresh'),
    allowNull: false
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: false
});

export default Token