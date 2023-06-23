import {isNil, kebabCase} from 'lodash'

import * as playerDal from '../data-access-layer/player'
import * as teamDal from '../data-access-layer/team'
import {GetAllPlayersFilters, IncludesFilters} from '../data-access-layer/types'
import {PlayerCreationAttributes} from '../models/player'
import {Player} from '../models'

export const create = async (payload: PlayerCreationAttributes): Promise<Player> => {
    return playerDal.create(payload);
}

export const findOrCreate = async (payload: PlayerCreationAttributes, includes?: IncludesFilters): Promise<Player> => {    
    return await playerDal.findOrCreate(payload, includes);
}

export const update = async (id: number, payload: Partial<PlayerCreationAttributes>): Promise<Player> => {    
    return playerDal.update(id, payload);
}

export const getById = (id: number, includes?: IncludesFilters): Promise<Player> => {
    return playerDal.getById(id, includes);
}

export const deleteById = (id: number): Promise<boolean> => {
    return playerDal.deleteById(id);
}

export const getAll = (filters?: GetAllPlayersFilters, includes?: IncludesFilters): Promise<Player[]> => {
    return playerDal.getAll(filters, includes);
}