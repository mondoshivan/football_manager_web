import { AllowNull, AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

import { Player, Skill } from '.';

export type PlayerSkillAttributes = {
  PlayerId: number
  SkillId: number
  value: number
};

export type PlayerSkillCreationAttributes = PlayerSkillAttributes;

@Table({ timestamps: true })
export class PlayerSkill extends Model<PlayerSkillAttributes, PlayerSkillCreationAttributes> implements PlayerSkillAttributes {

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  override id!: number;

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