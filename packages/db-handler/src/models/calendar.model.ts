import { AllowNull, BelongsToMany, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Occurrence } from './occurrence.model.js';
import { Team } from './team.model.js';
import { Championship } from './championship.model.js';

export type CalendarTypes = 'championship' | 'team' | 'player';

@Table({ timestamps: true })
export class Calendar extends Model {

  @HasMany(() => Occurrence)
  occurrences!: Occurrence[];

  @BelongsToMany(() => Championship, 'ChampionshipCalendar')
  championships!: Array<Championship & {ChampionshipCalendar: 'ChampionshipCalendar'}>;

  @BelongsToMany(() => Team, 'TeamCalendar')
  teams!: Array<Team & {TeamCalendar: 'TeamCalendar'}>;

  @AllowNull(false)
  @Column
  public type!: CalendarTypes;

}