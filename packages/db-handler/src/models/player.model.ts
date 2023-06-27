import { AllowNull, AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { PlayerSkill } from './player_skill.model.js';
import { Skill } from './skill.model.js';
import { Team } from './team.model.js';

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