import { AllowNull, AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Calendar } from './calendar.model';
import { Team } from './team.model';
import { ChampionshipCalendar } from './championship-calendar.model';
import { ChampionshipTeam } from './championship-team.model';

export type ChampionshipTypes = 'league' | 'cup';

type ChampionshipAttributes = {
  name: string
  type: ChampionshipTypes
}

export type ChampionshipCreationAttributes = ChampionshipAttributes;

@Table({ timestamps: true })
export class Championship extends Model<ChampionshipAttributes, ChampionshipCreationAttributes> implements ChampionshipAttributes {

  @BelongsToMany(() => Calendar, () => ChampionshipCalendar, 'championshipId', 'calendarId')
  calendars?: Array<Calendar & {ChampionshipCalendar: 'ChampionshipCalendar'}>;

  @BelongsToMany(() => Team, () => ChampionshipTeam, 'championshipId', 'teamId')
  teams?: Array<Team & {ChampionshipTeam: 'ChampionshipTeam'}>;

  @AllowNull(false)
  @Column
  public name!: string;

  @AllowNull(false)
  @Column
  public type!: ChampionshipTypes;

}