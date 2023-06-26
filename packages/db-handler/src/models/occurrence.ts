import { AllowNull, AutoIncrement, BelongsTo, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Calendar } from './calendar.js';

export type OccurrenceTypes = 'game' | 'training' | 'payday';

type OccurrenceAttributes = {
  type: OccurrenceTypes
  date: Date
}
export type OccurrenceCreationAttributes = OccurrenceAttributes

@Table({ timestamps: true })
export class Occurrence extends Model<OccurrenceAttributes, OccurrenceCreationAttributes> implements OccurrenceAttributes {

  @BelongsTo(() => Calendar)
  calendar!: Calendar;

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