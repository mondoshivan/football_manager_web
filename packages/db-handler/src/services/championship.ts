import {kebabCase} from 'lodash'

import * as championshipDal from '../data-access-layer/championship'
import {GetAllChampionshipsFilters} from '../data-access-layer/types'
import {ChampionshipInput, ChampionshipOutput} from '../models/championship'

export const create = async (payload: ChampionshipInput): Promise<ChampionshipOutput> => {
    let name = kebabCase(payload.name)
    const nameExists = await championshipDal.checkChampionshipExists(name)

    payload.name = nameExists ? `${name}-${Math.floor(Math.random() * 1000)}` : name
    
    return championshipDal.create(payload)
}

export const update = async (id: number, payload: Partial<ChampionshipInput>): Promise<ChampionshipOutput> => {
    if (payload.name) {
        let name = kebabCase(payload.name)
        const clubExists = await championshipDal.checkChampionshipExists(name)

        payload.name = clubExists ? `${name}-${Math.floor(Math.random() * 1000)}` : name
    }
    
    return championshipDal.update(id, payload)
}

export const getById = (id: number): Promise<ChampionshipOutput> => {
    return championshipDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return championshipDal.deleteById(id)
}

export const getAll = (filters: GetAllChampionshipsFilters): Promise<ChampionshipOutput[]> => {
    return championshipDal.getAll(filters)
}