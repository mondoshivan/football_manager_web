import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Token } from './index.js';

@Table({ timestamps: true })
export class TokenFamily extends Model {

  @HasMany(() => Token)
  tokens!: Token[];

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  override id!: number
}