import {Op} from 'sequelize'

import {Game} from '../models/index'
import {GetAllGameFilters, IncludesFilters} from './types'
import {GameInput} from '../models/game'
import { GetAllNotFoundError, IdNotFoundError } from '../error/error'
import { getIncludes } from './data-access-layer'

export const create = async (payload: GameInput): Promise<Game> => {
    return await Game.create(payload);
}

export const getById = async (id: number, includes?: IncludesFilters): Promise<Game> => {
    const one = await Game.findByPk(id, {
        include: getIncludes(includes),
    });

    if (!one) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return one;
}

export const getAll = async (filters?: GetAllGameFilters, includes?: IncludesFilters): Promise<Game[]> => {

    const entities = await Game.findAll({
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