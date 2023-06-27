import { AllowNull, AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

import { Player } from './player.model';
import { Skill } from './skill.model';

export type PlayerSkillAttributes = {
  PlayerId: number
  SkillId: number
  value: number
};

export type PlayerSkillCreationAttributes = PlayerSkillAttributes;

@Table({ timestamps: true })
export class PlayerSkill extends Model<PlayerSkillAttributes, PlayerSkillCreationAttributes> implements PlayerSkillAttributes {

  @ForeignKey(() => Player)
  @Column
  public PlayerId!: number;

  @ForeignKey(() => Skill)
  @Column
  public SkillId!: number;

  @AllowNull(false)
  @Column
  public value!: number;
}