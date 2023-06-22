import * as occurrenceDal from '../data-access-layer/occurrence'
import {GetAllOccurrenceFilters, IncludesFilters} from '../data-access-layer/types'
import Occurrence, {OccurrenceCreationAttributes} from '../models/occurrence'

export const create = async (payload: OccurrenceCreationAttributes): Promise<Occurrence> => {    
    return occurrenceDal.create(payload);
}

export const update = async (id: number, payload: Partial<OccurrenceCreationAttributes>): Promise<Occurrence> => {    
    return occurrenceDal.update(id, payload)
}

export const getById = (id: number, includes?: IncludesFilters): Promise<Occurrence> => {
    return occurrenceDal.getById(id, includes)
}

export const deleteById = (id: number): Promise<boolean> => {
    return occurrenceDal.deleteById(id)
}

export const getByType = (type: string, includes?: IncludesFilters): Promise<Occurrence[]> => {
    return occurrenceDal.getByType(type, includes);
}

export const getAll = (filters?: GetAllOccurrenceFilters, includes?: IncludesFilters): Promise<Occurrence[]> => {
    return occurrenceDal.getAll(filters, includes)
}