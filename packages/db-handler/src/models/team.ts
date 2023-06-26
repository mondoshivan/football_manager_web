import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Player } from './player.js';
import { Calendar } from './calendar.js';
import { Formation } from './formation.js';
import { Championship } from './index.js';

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

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  override id!: number

  @Column
  @AllowNull(false)
  public name!: string

  // declare addChampionship: HasManyAddAssociationMixin<Championship, Championship['id']>;
  // declare addPlayer: HasManyAddAssociationMixin<Player, Player['id']>;
  // declare setFormation: HasManyAddAssociationMixin<Formation, Formation['id']>;
  // declare addCalendar: BelongsToManyAddAssociationMixin<Calendar, Calendar['id']>;
}