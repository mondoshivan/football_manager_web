import {kebabCase} from 'lodash'

import * as playerDal from '../data-access-layer/player'
import {GetAllPlayersFilters} from '../data-access-layer/types'
import {PlayerInput, PlayerOutput} from '../models/player'

export const create = async (payload: PlayerInput): Promise<PlayerOutput> => {
    let name = kebabCase(payload.name)
    const nameExists = await playerDal.checkClubExists(name)

    payload.name = nameExists ? `${name}-${Math.floor(Math.random() * 1000)}` : name
    
    return playerDal.create(payload)
}

export const update = async (id: number, payload: Partial<PlayerInput>): Promise<PlayerOutput> => {
    if (payload.name) {
        let name = kebabCase(payload.name)
        const clubExists = await playerDal.checkClubExists(name)

        payload.name = clubExists ? `${name}-${Math.floor(Math.random() * 1000)}` : name
    }
    
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