import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Formation} from '../models'
import {GetAllFormationFilters} from './types'
import {FormationInput} from '../models/formation'
import { IdNotFoundError, NameNotFoundError } from '../error/error'

export const create = async (payload: FormationInput): Promise<Formation> => {
    return await Formation.create(payload);
}

export const findOrCreate = async (payload: FormationInput): Promise<Formation> => {
    const [one] = await Formation.findOrCreate({
        include: { all: true, nested: true },
        where: {
            name: payload.name
        },
        defaults: payload
    })

    return one;
}

export const update = async (id: number, payload: Partial<FormationInput>): Promise<Formation> => {
    const one = await Formation.findByPk(id);

    if (!one) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return await one.update(payload);
}

export const getById = async (id: number): Promise<Formation> => {
    const one = await Formation.findByPk(id, {
        include: { all: true, nested: true },
    });

    if (!one) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return one;
}

export const getByName = async (name: string): Promise<Formation[]> => {
    const entities = await Formation.findAll({
        include: { all: true, nested: true },
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

export const getAll = async (filters?: GetAllFormationFilters): Promise<Formation[]> => {
    return Formation.findAll({
        include: { all: true, nested: true },
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });
}

export const checkClubExists = async (name: string): Promise<boolean> => {
    const one = await Formation.findOne({
        include: { all: true, nested: true },
        where: {
            name
        }
    });

    return !isEmpty(one);
}