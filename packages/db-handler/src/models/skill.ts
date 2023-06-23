import { AllowNull, AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Player } from './player';
import { PlayerSkill } from './player_skill';

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
  public name!: string

  @Column
  @AllowNull(false)
  public type!: SkillTypes

  @Column
  @AllowNull(false)
  public description!: string

  @Column
  @AllowNull(false)
  public required!: boolean
}