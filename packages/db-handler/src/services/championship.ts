import lodash from 'lodash'
import { Championship} from '../models/championship.model.js'
import { BaseService } from './base.js'

export class ChampionshipService extends BaseService<Championship> {

  public async championshipNameExists(name: string) {
    const withName = await this.dataAccessLayer.findOne({ name });

    return !lodash.isEmpty(withName);
  }

}