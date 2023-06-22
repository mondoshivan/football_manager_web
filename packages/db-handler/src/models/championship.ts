import { Optional } from 'sequelize';
import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

export type ChampionshipTypes = 'league' | 'cup';

type ChampionshipAttributes = {
  id: number
  name: string
  type: ChampionshipTypes
}

export type ChampionshipCreationAttributes = Optional<ChampionshipAttributes, 'id'>

@Table({ timestamps: true })
export class Championship extends Model<ChampionshipAttributes, ChampionshipCreationAttributes> implements ChampionshipAttributes {

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  override id!: number;

  @Column
  @AllowNull(false)
  public name!: string;

  @Column
  @AllowNull(false)
  public type!: ChampionshipTypes;

  // declare getTeams: HasManyGetAssociationsMixin<Team>;
  // declare getCalendars: BelongsToManyGetAssociationsMixin<Calendar>;
  // declare addCalendar: BelongsToManyAddAssociationMixin<Calendar, Calendar['id']>;

}