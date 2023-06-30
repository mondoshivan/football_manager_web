import { AllowNull, AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

import { Player } from './player.model';
import { Skill } from './skill.model';

export type PlayerSkillAttributes = {
  playerId: number
  skillId: number
  value: number
};

export type PlayerSkillCreationAttributes = PlayerSkillAttributes;

@Table({ timestamps: true })
export class PlayerSkill extends Model<PlayerSkillAttributes, PlayerSkillCreationAttributes> implements PlayerSkillAttributes {

  @ForeignKey(() => Player)
  @Column
  public playerId!: number;

  @ForeignKey(() => Skill)
  @Column
  public skillId!: number;

  @AllowNull(false)
  @Column
  public value!: number;
}