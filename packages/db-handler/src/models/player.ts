import { AllowNull, AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { PlayerSkill, Skill, Team } from './index.js';

type PlayerAttributes = {
  firstName: string
  secondName: string
  birthday: Date
  height: number
}
export type PlayerCreationAttributes = PlayerAttributes

@Table({ timestamps: true })
export class Player extends Model<PlayerAttributes, PlayerCreationAttributes> implements PlayerAttributes {

  /**
   * Associations
   */

  @BelongsToMany(() => Skill, () => PlayerSkill)
  skills!: Array<Skill & {PlayerSkill: PlayerSkill}>;

  @BelongsToMany(() => Team, 'PlayerTeam')
  teams!: Array<Team & {PlayerTeam: 'PlayerTeam'}>;

  /**
   * Columns
   */

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  override id!: number

  @Column
  @AllowNull(false)
  public firstName!: string

  @Column
  @AllowNull(false)
  public secondName!: string

  @Column
  @AllowNull(false)
  public birthday!: Date;

  @Column
  @AllowNull(false)
  public height!: number;
}