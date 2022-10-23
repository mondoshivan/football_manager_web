import * as teamDal from '../data-access-layer/team'
import {GetAllTeamsFilters} from '../data-access-layer/types'
import Team, {TeamInput} from '../models/team'

export const create = async (payload: TeamInput): Promise<Team> => {
    return teamDal.create(payload);
}

export const findOrCreate = async (payload: TeamInput): Promise<Team> => {
    return teamDal.findOrCreate(payload);
}

export const update = async (id: number, payload: Partial<TeamInput>): Promise<Team> => {    
    return teamDal.update(id, payload);
}

export const getById = (id: number): Promise<Team> => {
    return teamDal.getById(id);
}

export const getByName = (name: string): Promise<Team[]> => {
    return teamDal.getByName(name);
}

export const deleteById = (id: number): Promise<boolean> => {
    return teamDal.deleteById(id);
}

export const getAll = (filters: GetAllTeamsFilters): Promise<Team[]> => {
    return teamDal.getAll(filters);
}