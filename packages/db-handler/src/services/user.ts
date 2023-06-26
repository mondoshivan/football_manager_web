import { User } from '../models/user.js'
import { BaseService } from './base.js'
import { NameNotFoundError } from '../error/error.js';
import { Utils } from "@football-manager/utils";

export class UserService extends BaseService<User> {

  public async getByEmail(email: string) {
    const entities = await this.dataAccessLayer.getAll({ email });

    if (!entities) {
      throw new NameNotFoundError(`entity with email '${email}' does not exist`);
    }

    return entities;
  }


  public async getByEmailAndPassword(email: string, password: string) {
    const [user] = await this.getByEmail(email);
    if (!user) return;

    password = Utils.passwordHash(password, user.salt);
    if (password === user.password) return user;

    return undefined;
  }

}