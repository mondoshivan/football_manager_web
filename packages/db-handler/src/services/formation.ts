import * as formationDal from '../data-access-layer/formation'
import {GetAllFormationFilters} from '../data-access-layer/types'
import Formation, {FormationInput} from '../models/formation'

export const create = async (payload: FormationInput): Promise<Formation> => {    
    return formationDal.create(payload);
}

export const findOrCreate = async (payload: FormationInput): Promise<Formation> => {    
    return formationDal.findOrCreate(payload);
}

export const update = async (id: number, payload: Partial<FormationInput>): Promise<Formation> => {    
    return formationDal.update(id, payload)
}

export const getById = (id: number): Promise<Formation> => {
    return formationDal.getById(id)
}

export const getByName = (name: string): Promise<Formation[]> => {
    return formationDal.getByName(name);
}

export const deleteById = (id: number): Promise<boolean> => {
    return formationDal.deleteById(id)
}

export const getAll = (filters: GetAllFormationFilters): Promise<Formation[]> => {
    return formationDal.getAll(filters)
}