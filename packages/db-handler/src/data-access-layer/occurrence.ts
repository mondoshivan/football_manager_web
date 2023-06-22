import {Op} from 'sequelize'

import { Occurrence } from '../models/index'
import { GetAllOccurrenceFilters, IncludesFilters } from './types'
import { OccurrenceCreationAttributes } from '../models/occurrence'
import { GetAllNotFoundError, IdNotFoundError, NameNotFoundError } from '../error/error'
import { getIncludes } from './data-access-layer'

export const create = async (payload: OccurrenceCreationAttributes): Promise<Occurrence> => {
    return await Occurrence.create(payload);
}

export const update = async (id: number, payload: Partial<OccurrenceCreationAttributes>): Promise<Occurrence> => {
    const player = await Occurrence.findByPk(id);

    if (!player) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return player.update(payload);
}

export const getById = async (id: number, includes?: IncludesFilters): Promise<Occurrence> => {

    const player = await Occurrence.findByPk(id, {
        include: getIncludes(includes)
    });

    if (!player) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return player;
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedPlayerCount = await Occurrence.destroy({
        where: {id}
    });

    return !!deletedPlayerCount; // !! -> converting to boolean
}

export const getByType = async (type: string, includes?: IncludesFilters): Promise<Occurrence[]> => {
    const entities = await Occurrence.findAll({
        include: getIncludes(includes),
        where: {
            type
        }
    });

    if (!entities) {
        throw new NameNotFoundError(`entity with type '${type}' does not exist`);
    }

    return entities;
}

export const getAll = async (filters?: GetAllOccurrenceFilters, includes?: IncludesFilters): Promise<Occurrence[]> => {

    const entities = await Occurrence.findAll({
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