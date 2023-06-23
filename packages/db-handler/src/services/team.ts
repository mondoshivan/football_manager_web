import * as teamDal from '../data-access-layer/team'
import {GetAllTeamsFilters, IncludesFilters} from '../data-access-layer/types'
import Team, {TeamCreationAttributes} from '../models/team'

export const create = async (payload: TeamCreationAttributes): Promise<Team> => {
    return teamDal.create(payload);
}

export const findOrCreate = async (payload: TeamCreationAttributes, includes?: IncludesFilters): Promise<Team> => {
    return teamDal.findOrCreate(payload, includes);
}

export const update = async (id: number, payload: Partial<TeamCreationAttributes>): Promise<Team> => {    
    return teamDal.update(id, payload);
}

export const getById = (id: number, includes?: IncludesFilters): Promise<Team> => {
    return teamDal.getById(id, includes);
}

export const getByName = (name: string, includes?: IncludesFilters): Promise<Team[]> => {
    return teamDal.getByName(name, includes);
}

export const deleteById = (id: number): Promise<boolean> => {
    return teamDal.deleteById(id);
}

export const getAll = (filters?: GetAllTeamsFilters, includes?: IncludesFilters): Promise<Team[]> => {
    return teamDal.getAll(filters, includes);
}