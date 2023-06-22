import {isEmpty, kebabCase} from 'lodash'

import * as championshipDal from '../data-access-layer/championship'
import {GetAllChampionshipsFilters, IncludesFilters} from '../data-access-layer/types'
import { Championship} from '../models/championship'
import { BaseService } from './base'

export class ChampionshipService extends BaseService<Championship> {

  public async championshipNameExists(name: string) {
    const championshipWithName = this.dataAccessLayer.findOne({ name });

    return !isEmpty(championshipWithName);
  }

}