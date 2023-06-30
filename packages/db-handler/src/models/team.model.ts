import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, ForeignKey, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Player } from './player.model';
import { Calendar } from './calendar.model';
import { Formation } from './formation.model';
import { Championship } from './championship.model';
import { ChampionshipTeam } from './championship-team.model';
import { PlayerTeam } from './player-team.model';
import { TeamCalendar } from './team-calendar.model';

type TeamAttributes = {
  name: string;
}

export type TeamCreationAttributes = TeamAttributes;

@Table({ timestamps: true })
export class Team extends Model<TeamAttributes, TeamCreationAttributes> implements TeamAttributes {

  @BelongsToMany(() => Player, () => PlayerTeam, 'teamId', 'playerId')
  players?: Array<Player & {PlayerTeam: 'PlayerTeam'}>;

  @BelongsToMany(() => Calendar, () => TeamCalendar, 'teamId', 'calendarId')
  calendars?: Array<Calendar & {TeamCalendar: 'TeamCalendar'}>;

  @BelongsToMany(() => Championship, () => ChampionshipTeam, 'teamId', 'championshipId')
  championships?: Array<Championship & {ChampionshipTeam: 'ChampionshipTeam'}>;

  @ForeignKey(() => Formation)
  @Column
  formationId!: number;

  @BelongsTo(() => Formation)
  formation!: Formation;

  @AllowNull(false)
  @Column
  public name!: string
}