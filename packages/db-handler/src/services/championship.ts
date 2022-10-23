import {kebabCase} from 'lodash'

import * as championshipDal from '../data-access-layer/championship'
import {GetAllChampionshipsFilters} from '../data-access-layer/types'
import Championship, {ChampionshipInput} from '../models/championship'

export const create = async (payload: ChampionshipInput): Promise<Championship> => {    
    return championshipDal.create(payload);
}

export const findOrCreate = async (payload: ChampionshipInput): Promise<Championship> => {    
    return championshipDal.findOrCreate(payload);
}

export const update = async (id: number, payload: Partial<ChampionshipInput>): Promise<Championship> => {    
    return championshipDal.update(id, payload)
}

export const getById = (id: number): Promise<Championship> => {
    return championshipDal.getById(id)
}

export const getByName = (name: string): Promise<Championship[]> => {
    return championshipDal.getByName(name);
}

export const deleteById = (id: number): Promise<boolean> => {
    return championshipDal.deleteById(id)
}

export const getAll = (filters: GetAllChampionshipsFilters): Promise<Championship[]> => {
    return championshipDal.getAll(filters)
}