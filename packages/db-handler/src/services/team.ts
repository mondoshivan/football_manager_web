import lodash from 'lodash'
import { Team } from '../models/team.model.js'
import { BaseService } from './base.js'

export class TeamService extends BaseService<Team> {

  public async teamNameExists(name: string) {
    const withName = await this.dataAccessLayer.findOne({ name });

    return !lodash.isEmpty(withName);
  }

}