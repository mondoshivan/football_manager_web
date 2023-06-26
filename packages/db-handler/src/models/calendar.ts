import { AllowNull, AutoIncrement, Column, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Occurrence } from './occurrence.js';

export type CalendarTypes = 'championship' | 'team' | 'player';

type CalendarAttributes = {
  id: number
  type: CalendarTypes
}

export type CalendarCreationAttributes = CalendarAttributes;

@Table({ timestamps: true })
export class Calendar extends Model<CalendarAttributes, CalendarCreationAttributes> implements CalendarAttributes {

  @HasMany(() => Occurrence)
  occurrences!: Occurrence[];

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  override id!: number;

  @Column
  @AllowNull(false)
  public type!: CalendarTypes;

  // declare addOccurrence: HasManyAddAssociationMixin<Occurrence, Occurrence['id']>;
}