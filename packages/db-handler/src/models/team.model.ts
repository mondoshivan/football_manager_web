import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Player } from './player.model.js';
import { Calendar } from './calendar.model.js';
import { Formation } from './formation.model.js';
import { Championship } from './championship.model.js';

type TeamAttributes = {
  name: string;
}

export type TeamCreationAttributes = TeamAttributes;

@Table({ timestamps: true })
export class Team extends Model<TeamAttributes, TeamCreationAttributes> implements TeamAttributes {

  @BelongsToMany(() => Player, 'PlayerTeam')
  players!: Array<Player & {PlayerTeam: 'PlayerTeam'}>;

  @BelongsToMany(() => Calendar, 'TeamCalendar')
  calendars!: Array<Calendar & {TeamCalendar: 'TeamCalendar'}>;

  @BelongsToMany(() => Championship, 'ChampionshipTeam')
  championships!: Array<Championship & {ChampionshipTeam: 'ChampionshipTeam'}>;

  @BelongsTo(() => Formation)
  formation!: Formation;

  @Column
  @AllowNull(false)
  public name!: string
}