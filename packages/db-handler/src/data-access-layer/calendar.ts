import {Op} from 'sequelize'

import {Calender} from '../models/index'
import {GetAllCalenderFilters, IncludesFilters} from './types'
import {CalenderInput} from '../models/calendar'
import { GetAllNotFoundError, IdNotFoundError } from '../error/error'
import { getIncludes } from './data-access-layer'

export const create = async (payload: CalenderInput): Promise<Calender> => {
    return await Calender.create(payload);
}

export const update = async (id: number, payload: Partial<CalenderInput>): Promise<Calender> => {
    const one = await Calender.findByPk(id);

    if (!one) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return await one.update(payload);
}

export const getById = async (id: number, includes?: IncludesFilters): Promise<Calender> => {
    const one = await Calender.findByPk(id, {
        include: getIncludes(includes),
    });

    if (!one) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return one;
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedCount = await Calender.destroy({
        where: {id}
    });

    return !!deletedCount; // !! -> converting to boolean
}

export const getAll = async (filters?: GetAllCalenderFilters, includes?: IncludesFilters): Promise<Calender[]> => {

    const entities = await Calender.findAll({
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