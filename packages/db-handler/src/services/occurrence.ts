import { Occurrence } from '../models/occurrence.model';
import { BaseService } from './base'
import { NameNotFoundError } from '../error/error';

export class OccurrenceService extends BaseService<Occurrence> {

  public async getByType(type: string) {
    const entities = await this.dataAccessLayer.getAll({ type });

    if (entities.length === 0) {
      throw new NameNotFoundError(`entity with type '${type}' does not exist`);
    }

    return entities;
  }

}