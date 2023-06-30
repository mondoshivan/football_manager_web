import { Utils } from '@football-manager/utils';
import { AllowNull, BeforeValidate, Column, Default, Model, Table } from 'sequelize-typescript';

export type RoleTypes = 'user' | 'admin';

export type UserCreationAttributes = {
  name: string;
  email: string;
  password: string;
}

type UserAttributes = UserCreationAttributes & {
  salt: string;
  confirmed: boolean;
  role: RoleTypes;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

@Table({ timestamps: true })
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {

  @AllowNull(false)
  @Column
  public name!: string

  @AllowNull(false)
  @Column
  public email!: string

  @AllowNull(false)
  @Column
  public password!: string

  @AllowNull(false)
  @Column
  public salt!: string

  @AllowNull(false)
  @Default(false)
  @Column
  public confirmed!: boolean

  @AllowNull(false)
  @Default('user')
  @Column
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