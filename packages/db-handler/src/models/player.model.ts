import { AllowNull, AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { PlayerSkill } from './player-skill.model';
import { Skill } from './skill.model';
import { Team } from './team.model';
import { PlayerTeam } from './player-team.model';

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

  @BelongsToMany(() => Skill, () => PlayerSkill, 'playerId', 'skillId')
  skills?: Array<Skill & {PlayerSkill: PlayerSkill}>;

  @BelongsToMany(() => Team, () => PlayerTeam, 'playerId', 'teamId')
  teams?: Array<Team & {PlayerTeam: 'PlayerTeam'}>;

  /**
   * Columns
   */

  @AllowNull(false)
  @Column
  public firstName!: string

  @AllowNull(false)
  @Column
  public secondName!: string

  @AllowNull(false)
  @Column
  public birthday!: Date;

  @AllowNull(false)
  @Column
  public height!: number;
}