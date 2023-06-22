import { Optional } from 'sequelize';
import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

export type OccurrenceTypes = 'game' | 'training' | 'payday';

type OccurrenceAttributes = {
  id: number
  type: OccurrenceTypes
  date: Date
}
export type OccurrenceCreationAttributes = Optional<OccurrenceAttributes, 'id'>

@Table({ timestamps: true })
export class Occurrence extends Model<OccurrenceAttributes, OccurrenceCreationAttributes> implements OccurrenceAttributes {

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  override id!: number

  @Column
  @AllowNull(false)
  public type!: OccurrenceTypes

  @Column
  @AllowNull(false)
  public date!: Date;
}