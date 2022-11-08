import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface TokenFamilyAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface TokenFamilyInput extends Optional<TokenFamilyAttributes, 'id'> {}

class TokenFamily extends Model<TokenFamilyAttributes, TokenFamilyInput> implements TokenFamilyAttributes {
    public id!: number
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  TokenFamily.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: false
  });
  
  export default TokenFamily