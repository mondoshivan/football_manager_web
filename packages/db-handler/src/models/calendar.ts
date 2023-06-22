import { Optional } from 'sequelize'
import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

export type CalendarTypes = 'championship' | 'team' | 'player';

type CalendarAttributes = {
  id: number
  type: CalendarTypes
}

export type CalendarCreationAttributes = Optional<CalendarAttributes, 'id'>

@Table({ timestamps: true })
export class Calendar extends Model<CalendarAttributes, CalendarCreationAttributes> implements CalendarAttributes {

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