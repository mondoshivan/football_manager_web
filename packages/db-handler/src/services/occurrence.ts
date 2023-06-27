import { Occurrence } from '../models/occurrence.model.js';
import { BaseService } from './base.js'
import { NameNotFoundError } from '../error/error.js';

export class OccurrenceService extends BaseService<Occurrence> {

  public async getByType(type: string) {
    const entities = await this.dataAccessLayer.getAll({ type });

    if (entities.length === 0) {
      throw new NameNotFoundError(`entity with type '${type}' does not exist`);
    }

    return entities;
  }

}