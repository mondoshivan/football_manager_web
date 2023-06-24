import { Table, Column, Model, Unique, PrimaryKey, AutoIncrement, AllowNull} from 'sequelize-typescript';

export type AppAttributes = {
    start: Date;
    day: Date;
}

export type AppCreationAttributes = AppAttributes;

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
