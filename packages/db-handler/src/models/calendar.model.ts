import { AllowNull, BelongsToMany, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Occurrence } from './occurrence.model';
import { Team } from './team.model';
import { Championship } from './championship.model';
import { ChampionshipCalendar } from './championship-calendar.model';
import { TeamCalendar } from './team-calendar.model';

export type CalendarTypes = 'championship' | 'team' | 'player';

@Table({ timestamps: true })
export class Calendar extends Model {

  @HasMany(() => Occurrence)
  occurrences?: Occurrence[];

  @BelongsToMany(() => Championship, () => ChampionshipCalendar, 'calendarId', 'championshipId')
  championships?: Array<Championship & {ChampionshipCalendar: 'ChampionshipCalendar'}>;

  @BelongsToMany(() => Team, () => TeamCalendar, 'calendarId', 'teamId')
  teams?: Array<Team & {TeamCalendar: 'TeamCalendar'}>;

  @AllowNull(false)
  @Column
  public type!: CalendarTypes;

}