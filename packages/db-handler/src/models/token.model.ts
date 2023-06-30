import { AllowNull, AutoIncrement, BelongsTo, Column, Default, ForeignKey, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { TokenFamily } from './token-family.model';
import { Optional } from 'sequelize';

export type TokenTypes = 'access' | 'refresh';

@Table({ timestamps: true })
export class Token extends Model {

  @ForeignKey(() => TokenFamily)
  @Column
  tokenFamilyId!: number;

  @BelongsTo(() => TokenFamily)
  tokenFamily!: TokenFamily;

  @AllowNull(false)
  @Column
  public signature!: string

  @AllowNull(false)
  @Column
  public type!: TokenTypes

  @AllowNull(false)
  @Default(true)
  @Column
  public valid!: boolean
}