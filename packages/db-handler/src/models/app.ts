import { Optional } from 'sequelize';
import { Table, Column, Model, Unique, PrimaryKey, AutoIncrement, AllowNull} from 'sequelize-typescript';

export type AppAttributes = {
    id: number;
    start: Date;
    day: Date;
}

export type AppCreationAttributes = Optional<AppAttributes, 'id'>

@Table({ timestamps: true })
export class App extends Model<AppAttributes, AppCreationAttributes> implements AppAttributes {

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  override id!: number;

  @Column
  @AllowNull(false)
  start!: Date;
  
  @Column
  @AllowNull(false)
  day!: Date;
}
