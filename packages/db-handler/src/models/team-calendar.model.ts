import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Team } from './team.model';
import { Calendar } from './calendar.model';

@Table({ timestamps: true })
export class TeamCalendar extends Model {

  @ForeignKey(() => Calendar)
  @Column
  public calendarId!: number;

  @ForeignKey(() => Team)
  @Column
  public teamId!: number;
}