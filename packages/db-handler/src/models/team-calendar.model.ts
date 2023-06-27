import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Team } from './team.model';
import { Calendar } from './calendar.model';

@Table({ timestamps: true })
export class TeamCalendar extends Model {

  @ForeignKey(() => Calendar)
  @Column
  public CalendarId!: number;

  @ForeignKey(() => Team)
  @Column
  public TeamId!: number;
}