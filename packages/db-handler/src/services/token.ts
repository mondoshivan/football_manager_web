import { isEmpty } from 'lodash'
import { Token } from '../models/token.js'
import { BaseService } from './base.js'

export class TokenService extends BaseService<Token> {

  public async getBySignature(signature: string) {
    const hits = this.dataAccessLayer.findOne({ signature });

    return !isEmpty(hits);
  }
}