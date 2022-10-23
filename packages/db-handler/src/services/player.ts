import {isNil, kebabCase} from 'lodash'

import * as playerDal from '../data-access-layer/player'
import * as teamDal from '../data-access-layer/team'
import {GetAllPlayersFilters} from '../data-access-layer/types'
import {PlayerInput} from '../models/player'
import {Player} from '../models'

export const create = async (payload: PlayerInput): Promise<Player> => {
    return playerDal.create(payload);
}

export const findOrCreate = async (payload: PlayerInput): Promise<Player> => {    
    
    const player = await playerDal.findOrCreate(payload);

    if (!isNil(payload.teams)) {
        const teams = await Promise.all(payload.teams.map(teamDal.findOrCreate));

        await player.setTeams(teams);
    }
    
    return player;
}

export const update = async (id: number, payload: Partial<PlayerInput>): Promise<Player> => {    
    return playerDal.update(id, payload)
}

export const getById = (id: number): Promise<Player> => {
    return playerDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return playerDal.deleteById(id)
}

export const getAll = (filters: GetAllPlayersFilters): Promise<Player[]> => {
    return playerDal.getAll(filters)
}