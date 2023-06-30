import { AllowNull, AutoIncrement, Column, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Team } from './team.model';

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
  teams?: Team[];
  
  @AllowNull(false)
  @Column
  public name!: string

  @AllowNull(false)
  @Column
  public description!: string;

  @AllowNull(false)
  @Column
  public defender!: number;

  @AllowNull(false)
  @Column
  public midfielder!: number;

  @AllowNull(false)
  @Column
  public forward!: number;
}