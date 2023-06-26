import { AllowNull, AutoIncrement, BelongsToMany, Column, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Occurrence } from './occurrence.js';
import { Team } from './team.js';
import { Championship } from './index.js';

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

  @BelongsToMany(() => Championship, 'ChampionshipCalendar')
  championships!: Array<Championship & {ChampionshipCalendar: 'ChampionshipCalendar'}>;

  @BelongsToMany(() => Team, 'TeamCalendar')
  teams!: Array<Team & {TeamCalendar: 'TeamCalendar'}>;

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