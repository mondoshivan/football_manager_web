import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Championship } from './championship.model';
import { Team } from './team.model';

@Table({ timestamps: true })
export class ChampionshipTeam extends Model {

  @ForeignKey(() => Championship)
  @Column
  public championshipId!: number;

  @ForeignKey(() => Team)
  @Column
  public teamId!: number;
}