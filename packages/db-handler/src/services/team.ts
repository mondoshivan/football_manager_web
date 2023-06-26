import { isEmpty } from 'lodash'
import { Team } from '../models/team.js'
import { BaseService } from './base.js'

export class TeamService extends BaseService<Team> {

  public async teamNameExists(name: string) {
    const withName = this.dataAccessLayer.findOne({ name });

    return !isEmpty(withName);
  }

}