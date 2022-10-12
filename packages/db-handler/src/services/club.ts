import {kebabCase} from 'lodash'

import * as clubDal from '../data-access-layer/club'
import {GetAllClubsFilters} from '../data-access-layer/types'
import {ClubInput, ClubOutput} from '../models/club'

export const create = async (payload: ClubInput): Promise<ClubOutput> => {
    let name = kebabCase(payload.name)
    const nameExists = await clubDal.checkClubExists(name)

    payload.name = nameExists ? `${name}-${Math.floor(Math.random() * 1000)}` : name
    
    return clubDal.create(payload)
}

export const update = async (id: number, payload: Partial<ClubInput>): Promise<ClubOutput> => {
    if (payload.name) {
        let name = kebabCase(payload.name)
        const clubExists = await clubDal.checkClubExists(name)

        payload.name = clubExists ? `${name}-${Math.floor(Math.random() * 1000)}` : name
    }
    
    return clubDal.update(id, payload)
}

export const getById = (id: number): Promise<ClubOutput> => {
    return clubDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return clubDal.deleteById(id)
}

export const getAll = (filters: GetAllClubsFilters): Promise<ClubOutput[]> => {
    return clubDal.getAll(filters)
}