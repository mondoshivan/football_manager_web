import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Formation} from '../models'
import {GetAllFormationFilters, IncludesFilters} from './types'
import {FormationCreationAttributes} from '../models/formation'
import { GetAllNotFoundError, IdNotFoundError, NameNotFoundError } from '../error/error'
import { getIncludes } from './data-access-layer'

export const create = async (payload: FormationCreationAttributes): Promise<Formation> => {
    return await Formation.create(payload);
}

export const findOrCreate = async (payload: FormationCreationAttributes, includes?: IncludesFilters): Promise<Formation> => {
    const [one] = await Formation.findOrCreate({
        include: getIncludes(includes),
        where: {
            name: payload.name
        },
        defaults: payload
    })

    return one;
}

export const update = async (id: number, payload: Partial<FormationCreationAttributes>): Promise<Formation> => {
    const one = await Formation.findByPk(id);

    if (!one) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return await one.update(payload);
}

export const getById = async (id: number, includes?: IncludesFilters): Promise<Formation> => {
    const one = await Formation.findByPk(id, {
        include: getIncludes(includes),
    });

    if (!one) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return one;
}

export const getByName = async (name: string, includes?: IncludesFilters): Promise<Formation[]> => {
    const entities = await Formation.findAll({
        include: getIncludes(includes),
        where: {
            name
        }
    });

    if (!entities) {
        throw new NameNotFoundError(`entity with name '${name}' does not exist`);
    }

    return entities;
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedCount = await Formation.destroy({
        where: {id}
    });

    return !!deletedCount; // !! -> converting to boolean
}

export const getAll = async (filters?: GetAllFormationFilters, includes?: IncludesFilters): Promise<Formation[]> => {

    const entities = await Formation.findAll({
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

export const checkClubExists = async (name: string, includes?: IncludesFilters): Promise<boolean> => {
    const one = await Formation.findOne({
        include: getIncludes(includes),
        where: {
            name
        }
    });

    return !isEmpty(one);
}