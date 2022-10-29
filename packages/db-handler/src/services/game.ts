import * as gameDal from '../data-access-layer/game'
import {GetAllGameFilters, IncludesFilters} from '../data-access-layer/types'
import Game, {GameInput} from '../models/game'

export const create = async (payload: GameInput): Promise<Game> => {    
    return gameDal.create(payload);
}

export const getById = (id: number, includes?: IncludesFilters): Promise<Game> => {
    return gameDal.getById(id, includes)
}

export const getAll = (filters?: GetAllGameFilters, includes?: IncludesFilters): Promise<Game[]> => {
    return gameDal.getAll(filters, includes)
}