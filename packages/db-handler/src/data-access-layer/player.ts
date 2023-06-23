import {Op} from 'sequelize'

import {Player} from '../models'
import {GetAllPlayersFilters, IncludesFilters} from './types'
import {PlayerCreationAttributes} from '../models/player'
import { GetAllNotFoundError, IdNotFoundError } from '../error/error'
import { getIncludes } from './data-access-layer'

export const create = async (payload: PlayerCreationAttributes): Promise<Player> => {
    return await Player.create(payload);
}

export const findOrCreate = async (payload: PlayerCreationAttributes, includes?: IncludesFilters): Promise<Player> => {
    const [player] = await Player.findOrCreate({
        include: getIncludes(includes),
        where: {
            firstName: payload.firstName,
            secondName: payload.secondName
        },
        defaults: payload
    })

    return player;
}

export const update = async (id: number, payload: Partial<PlayerCreationAttributes>): Promise<Player> => {
    const player = await Player.findByPk(id);

    if (!player) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return player.update(payload);
}

export const getById = async (id: number, includes?: IncludesFilters): Promise<Player> => {

    const player = await Player.findByPk(id, {
        include: getIncludes(includes)
    });

    if (!player) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return player;
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedPlayerCount = await Player.destroy({
        where: {id}
    });

    return !!deletedPlayerCount; // !! -> converting to boolean
}

export const getAll = async (filters?: GetAllPlayersFilters, includes?: IncludesFilters): Promise<Player[]> => {

    const entities = await Player.findAll({
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