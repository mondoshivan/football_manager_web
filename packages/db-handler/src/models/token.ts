import { AllowNull, AutoIncrement, BelongsTo, Column, Default, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { TokenFamily } from '.';

export type TokenTypes = 'access' | 'refresh';

type TokenAttributes = {
  signature: string
  type: TokenTypes
  valid: boolean
}
export type TokenCreationAttributes = TokenAttributes;

@Table({ timestamps: true })
export class Token extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {

  @BelongsTo(() => TokenFamily)
  tokenFamily!: TokenFamily;

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  override id!: number

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

  // declare setTokenFamily: BelongsToSetAssociationMixin<TokenFamily, TokenFamily['id']>;
  // declare getTokenFamily: BelongsToGetAssociationMixin<TokenFamily>;
}