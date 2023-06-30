import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Championship } from './championship.model';
import { Calendar } from './calendar.model';

@Table({ timestamps: true })
export class ChampionshipCalendar extends Model {

  @ForeignKey(() => Championship)
  @Column
  public championshipId!: number;

  @ForeignKey(() => Calendar)
  @Column
  public calendarId!: number;
}