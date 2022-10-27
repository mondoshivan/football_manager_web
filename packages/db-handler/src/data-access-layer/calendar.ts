import {Op} from 'sequelize'

import {Calendar} from '../models/index'
import {GetAllCalendarFilters, IncludesFilters} from './types'
import {CalendarInput} from '../models/calendar'
import { GetAllNotFoundError, IdNotFoundError } from '../error/error'
import { getIncludes } from './data-access-layer'

export const create = async (payload: CalendarInput): Promise<Calendar> => {
    return await Calendar.create(payload);
}

export const update = async (id: number, payload: Partial<CalendarInput>): Promise<Calendar> => {
    const one = await Calendar.findByPk(id);

    if (!one) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return await one.update(payload);
}

export const getById = async (id: number, includes?: IncludesFilters): Promise<Calendar> => {
    const one = await Calendar.findByPk(id, {
        include: getIncludes(includes),
    });

    if (!one) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return one;
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedCount = await Calendar.destroy({
        where: {id}
    });

    return !!deletedCount; // !! -> converting to boolean
}

export const getAll = async (filters?: GetAllCalendarFilters, includes?: IncludesFilters): Promise<Calendar[]> => {

    const entities = await Calendar.findAll({
        include: getIncludes(includes),
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });
    
    if (!entities) {
        throw new GetAllNotFoundError(`nothing found`);
    }

    return entities;
}