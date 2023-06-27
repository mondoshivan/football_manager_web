import { AllowNull, AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Calendar } from './calendar.model.js';
import { Team } from './team.model.js';

export type ChampionshipTypes = 'league' | 'cup';

type ChampionshipAttributes = {
  name: string
  type: ChampionshipTypes
}

export type ChampionshipCreationAttributes = ChampionshipAttributes;

@Table({ timestamps: true })
export class Championship extends Model<ChampionshipAttributes, ChampionshipCreationAttributes> implements ChampionshipAttributes {

  @BelongsToMany(() => Calendar, 'ChampionshipCalendar')
  calendars!: Array<Calendar & {ChampionshipCalendar: 'ChampionshipCalendar'}>;

  @BelongsToMany(() => Team, 'ChampionshipTeam')
  teams!: Array<Team & {ChampionshipTeam: 'ChampionshipTeam'}>;

  @Column
  @AllowNull(false)
  public name!: string;

  @Column
  @AllowNull(false)
  public type!: ChampionshipTypes;

}