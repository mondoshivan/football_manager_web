import { AllowNull, AutoIncrement, Column, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Team } from './team.model.js';

type FormationAttributes = {
  name: string;
  description: string;
  defender: number;
  midfielder: number;
  forward: number;
}

export type FormationCreationAttributes = FormationAttributes;

@Table({ timestamps: true })
export class Formation extends Model<FormationAttributes, FormationCreationAttributes> implements FormationAttributes {
  
  @HasMany(() => Team)
  teams!: Team[];
  
  @Column
  @AllowNull(false)
  public name!: string

  @Column
  @AllowNull(false)
  public description!: string;

  @Column
  @AllowNull(false)
  public defender!: number;

  @Column
  @AllowNull(false)
  public midfielder!: number;

  @Column
  @AllowNull(false)
  public forward!: number;
}