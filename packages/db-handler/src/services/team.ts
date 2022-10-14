import {kebabCase} from 'lodash'

import * as teamDal from '../data-access-layer/team'
import {GetAllTeamsFilters} from '../data-access-layer/types'
import {TeamInput, TeamOutput} from '../models/team'

export const create = async (payload: TeamInput): Promise<TeamOutput> => {
    let name = kebabCase(payload.name)
    const nameExists = await teamDal.checkClubExists(name)

    payload.name = nameExists ? `${name}-${Math.floor(Math.random() * 1000)}` : name
    
    return teamDal.create(payload)
}

export const update = async (id: number, payload: Partial<TeamInput>): Promise<TeamOutput> => {
    if (payload.name) {
        let name = kebabCase(payload.name)
        const clubExists = await teamDal.checkClubExists(name)

        payload.name = clubExists ? `${name}-${Math.floor(Math.random() * 1000)}` : name
    }
    
    return teamDal.update(id, payload)
}

export const getById = (id: number): Promise<TeamOutput> => {
    return teamDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return teamDal.deleteById(id)
}

export const getAll = (filters: GetAllTeamsFilters): Promise<TeamOutput[]> => {
    return teamDal.getAll(filters)
}