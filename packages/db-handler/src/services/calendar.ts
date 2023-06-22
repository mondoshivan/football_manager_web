import * as calendarDal from '../data-access-layer/calendar'
import {GetAllCalendarFilters, IncludesFilters} from '../data-access-layer/types'
import Calendar, {CalendarCreationAttributes} from '../models/calendar'

export const create = async (payload: CalendarCreationAttributes): Promise<Calendar> => {    
    return calendarDal.create(payload);
}

export const update = async (id: number, payload: Partial<CalendarCreationAttributes>): Promise<Calendar> => {    
    return calendarDal.update(id, payload)
}

export const getById = (id: number, includes?: IncludesFilters): Promise<Calendar> => {
    return calendarDal.getById(id, includes)
}

export const deleteById = (id: number): Promise<boolean> => {
    return calendarDal.deleteById(id)
}

export const getAll = (filters?: GetAllCalendarFilters, includes?: IncludesFilters): Promise<Calendar[]> => {
    return calendarDal.getAll(filters, includes)
}