import { Token } from '../models/token.model'
import { BaseService } from './base'
import { NameNotFoundError } from '../error/error';

export class TokenService extends BaseService<Token> {

  public async getBySignature(signature: string) {
    const entities = await this.dataAccessLayer.getAll({ signature });

    if (!entities) {
      throw new NameNotFoundError(`entity with signature '${signature}' does not exist`);
    }

    return entities;
  }
}