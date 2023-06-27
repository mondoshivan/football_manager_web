import { AllowNull, AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

import { Player } from './player.model.js';
import { Skill } from './skill.model.js';

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

  @Column
  @AllowNull(false)
  public value!: number;
}