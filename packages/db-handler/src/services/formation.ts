import * as formationDal from '../data-access-layer/formation'
import {GetAllFormationFilters, IncludesFilters} from '../data-access-layer/types'
import Formation, {FormationCreationAttributes} from '../models/formation'

export const create = async (payload: FormationCreationAttributes): Promise<Formation> => {    
    return formationDal.create(payload);
}

export const findOrCreate = async (payload: FormationCreationAttributes, includes?: IncludesFilters): Promise<Formation> => {    
    return formationDal.findOrCreate(payload, includes);
}

export const update = async (id: number, payload: Partial<FormationCreationAttributes>): Promise<Formation> => {    
    return formationDal.update(id, payload)
}

export const getById = (id: number, includes?: IncludesFilters): Promise<Formation> => {
    return formationDal.getById(id, includes)
}

export const getByName = (name: string, includes?: IncludesFilters): Promise<Formation[]> => {
    return formationDal.getByName(name, includes);
}

export const deleteById = (id: number): Promise<boolean> => {
    return formationDal.deleteById(id)
}

export const getAll = (filters?: GetAllFormationFilters, includes?: IncludesFilters): Promise<Formation[]> => {
    return formationDal.getAll(filters, includes)
}