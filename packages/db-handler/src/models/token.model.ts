import { AllowNull, AutoIncrement, BelongsTo, Column, Default, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { TokenFamily } from './token-family.model.js';
import { Optional } from 'sequelize';

export type TokenTypes = 'access' | 'refresh';

@Table({ timestamps: true })
export class Token extends Model {

  @BelongsTo(() => TokenFamily)
  tokenFamily!: TokenFamily;

  @Column
  @AllowNull(false)
  public signature!: string

  @Column
  @AllowNull(false)
  public type!: TokenTypes

  @Column
  @AllowNull(false)
  @Default(true)
  public valid!: boolean
}