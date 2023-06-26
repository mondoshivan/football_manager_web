import { isEmpty } from 'lodash'
import { Occurrence } from '../models/occurrence.js';
import { BaseService } from './base.js'

export class OccurrenceService extends BaseService<Occurrence> {

  public async getByType(type: string) {
    const entity = this.dataAccessLayer.findOne({ type });

    return !isEmpty(entity);
  }

}