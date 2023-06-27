import { AllowNull, BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Calendar } from './calendar.model.js';

export type OccurrenceTypes = 'game' | 'training' | 'payday';

@Table({ timestamps: true })
export class Occurrence extends Model {

  @BelongsTo(() => Calendar)
  calendar!: Calendar;

  @AllowNull(false)
  @Column
  public type!: OccurrenceTypes

  @AllowNull(false)
  @Column
  public date!: Date;
}