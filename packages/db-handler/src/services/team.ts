import * as teamDal from '../data-access-layer/team'
import {GetAllTeamsFilters} from '../data-access-layer/types'
import {TeamInput, TeamOutput} from '../models/team'

export const create = async (payload: TeamInput): Promise<TeamOutput> => {
    return teamDal.findOrCreate(payload);
}

export const update = async (id: number, payload: Partial<TeamInput>): Promise<TeamOutput> => {    
    return teamDal.update(id, payload);
}

export const getById = (id: number): Promise<TeamOutput> => {
    return teamDal.getById(id);
}

export const deleteById = (id: number): Promise<boolean> => {
    return teamDal.deleteById(id);
}

export const getAll = (filters: GetAllTeamsFilters): Promise<TeamOutput[]> => {
    return teamDal.getAll(filters);
}