import {isNil, kebabCase} from 'lodash'

import * as playerDal from '../data-access-layer/player'
import * as teamDal from '../data-access-layer/team'
import {GetAllPlayersFilters} from '../data-access-layer/types'
import {PlayerInput, PlayerOutput} from '../models/player'

export const create = async (payload: PlayerInput): Promise<PlayerOutput> => {    
    
    if (!isNil(payload.teams)) {
        const teams = await Promise.all(payload.teams.map(teamDal.findOrCreate))

        payload.teams = teams;
    }
    
    return playerDal.findOrCreate(payload);
}

export const update = async (id: number, payload: Partial<PlayerInput>): Promise<PlayerOutput> => {    
    return playerDal.update(id, payload)
}

export const getById = (id: number): Promise<PlayerOutput> => {
    return playerDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return playerDal.deleteById(id)
}

export const getAll = (filters: GetAllPlayersFilters): Promise<PlayerOutput[]> => {
    return playerDal.getAll(filters)
}