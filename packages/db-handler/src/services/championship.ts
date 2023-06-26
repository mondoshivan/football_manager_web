import { isEmpty } from 'lodash'
import { Championship} from '../models/championship.js'
import { BaseService } from './base.js'

export class ChampionshipService extends BaseService<Championship> {

  public async championshipNameExists(name: string) {
    const withName = this.dataAccessLayer.findOne({ name });

    return !isEmpty(withName);
  }

}