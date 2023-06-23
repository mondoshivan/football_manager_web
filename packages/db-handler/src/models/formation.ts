import { Optional } from 'sequelize';
import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

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