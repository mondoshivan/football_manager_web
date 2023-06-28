import { AllowNull, AutoIncrement, BelongsToMany, Column, Default, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Player } from './player.model';
import { PlayerSkill } from './player-skill.model';

export type SkillTypes = 'physical' | 'mental';

type SkillAttributes = {
  name: string
  type: SkillTypes
  description: string
  required: boolean
}

export type SkillCreationAttribute = SkillAttributes;

@Table({ timestamps: true })
export class Skill extends Model<SkillAttributes, SkillCreationAttribute> implements SkillAttributes {

  /**
   * Associations
   */
  
  @BelongsToMany(() => Player, () => PlayerSkill)
  players!: Array<Player & {PlayerSkill: 'PlayerSkill'}>;

  /**
   * Columns
   */

  @AllowNull(false)
  @Column
  public name!: string

  @AllowNull(false)
  @Column
  public type!: SkillTypes

  @AllowNull(false)
  @Column
  public description!: string

  @AllowNull(false)
  @Default(false)
  @Column
  public required!: boolean
}