import { HasMany, Model, Table } from 'sequelize-typescript';
import { Token } from './token.model';

@Table({ timestamps: true })
export class TokenFamily extends Model {

  @HasMany(() => Token)
  tokens?: Token[];

}