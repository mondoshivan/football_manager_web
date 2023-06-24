import { Utils } from '@football-manager/utils';
import { AllowNull, AutoIncrement, BeforeValidate, Column, Default, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

export type RoleTypes = 'user' | 'admin';

export type UserCreationAttributes = {
  name: string;
  email: string;
  password: string;
}

type UserAttributes = UserCreationAttributes & {
  id: number;
  salt: string;
  confirmed: boolean;
  role: RoleTypes;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

@Table({ timestamps: true })
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  override id!: number

  @Column
  @AllowNull(false)
  public name!: string

  @Column
  @AllowNull(false)
  public email!: string

  @Column
  @AllowNull(false)
  public password!: string

  @Column
  @AllowNull(false)
  public salt!: string

  @Column
  @AllowNull(false)
  @Default(false)
  public confirmed!: boolean

  @Column
  @AllowNull(false)
  @Default('user')
  public role!: RoleTypes

  /**
   * Converts the user password to a hash,
   * generates a salt and sets the confirmed property to false.
   * 
   * @param user to be converted
   */
  @BeforeValidate
  static convert(user: User) {
    user.confirmed = false;
    user.email = user.email.toLowerCase();
    user.salt = Utils.uuid();
    user.password = Utils.passwordHash(user.password, user.salt);
  }
}