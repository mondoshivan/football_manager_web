import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Team } from './team.model';
import { Player } from './player.model';

@Table({ timestamps: true })
export class PlayerTeam extends Model {

  @ForeignKey(() => Player)
  @Column
  public playerId!: number;

  @ForeignKey(() => Team)
  @Column
  public teamId!: number;
}