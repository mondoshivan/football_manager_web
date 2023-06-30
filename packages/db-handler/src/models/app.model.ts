import { Table, Column, Model, Unique, PrimaryKey, AutoIncrement, AllowNull} from 'sequelize-typescript';

@Table({ timestamps: true })
export class App extends Model {

  @AllowNull(false)
  @Column
  start!: Date;
  
  @AllowNull(false)
  @Column
  day!: Date;
}
