import lodash from 'lodash'
import { Championship} from '../models/championship.model'
import { BaseService } from './base'

export class ChampionshipService extends BaseService<Championship> {

  public async championshipNameExists(name: string) {
    const withName = await this.dataAccessLayer.findOne({ name });

    return !lodash.isEmpty(withName);
  }

}