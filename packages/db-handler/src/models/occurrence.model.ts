import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Calendar } from './calendar.model';

export type OccurrenceTypes = 'game' | 'training' | 'payday';

@Table({ timestamps: true })
export class Occurrence extends Model {

  @ForeignKey(() => Calendar)
  @Column
  calendarId!: number;

  @BelongsTo(() => Calendar)
  calendar!: Calendar;

  @AllowNull(false)
  @Column
  public type!: OccurrenceTypes

  @AllowNull(false)
  @Column
  public date!: Date;

}