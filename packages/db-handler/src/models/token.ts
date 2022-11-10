import { BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import TokenFamily from './token-family';

export type TokenTypes = 'access' | 'refresh';

interface TokenAttributes {
  id: number;
  signature: string;
  type: TokenTypes;
  valid: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface TokenInput extends Optional<TokenAttributes, 'id' | 'valid'> { }

class Token extends Model<TokenAttributes, TokenInput> implements TokenAttributes {
  public id!: number
  public signature!: string
  public type!: TokenTypes
  public valid!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  declare setTokenFamily: BelongsToSetAssociationMixin<TokenFamily, TokenFamily['id']>;
  declare getTokenFamily: BelongsToGetAssociationMixin<TokenFamily>;
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
  valid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: false
});

export default Token