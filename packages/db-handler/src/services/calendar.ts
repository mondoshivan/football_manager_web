import * as calenderDal from '../data-access-layer/calendar'
import {GetAllCalenderFilters, IncludesFilters} from '../data-access-layer/types'
import Calender, {CalenderInput} from '../models/calendar'

export const create = async (payload: CalenderInput): Promise<Calender> => {    
    return calenderDal.create(payload);
}

export const update = async (id: number, payload: Partial<CalenderInput>): Promise<Calender> => {    
    return calenderDal.update(id, payload)
}

export const getById = (id: number, includes?: IncludesFilters): Promise<Calender> => {
    return calenderDal.getById(id, includes)
}

export const deleteById = (id: number): Promise<boolean> => {
    return calenderDal.deleteById(id)
}

export const getAll = (filters?: GetAllCalenderFilters, includes?: IncludesFilters): Promise<Calender[]> => {
    return calenderDal.getAll(filters, includes)
}