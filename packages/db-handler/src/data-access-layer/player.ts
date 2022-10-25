import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Player} from '../models'
import {GetAllPlayersFilters} from './types'
import {PlayerInput} from '../models/player'
import { IdNotFoundError } from '../error/error'

export const create = async (payload: PlayerInput): Promise<Player> => {
    return await Player.create(payload);
}

export const findOrCreate = async (payload: PlayerInput): Promise<Player> => {
    const [player] = await Player.findOrCreate({
        include: { all: true, nested: true },
        where: {
            firstName: payload.firstName,
            secondName: payload.secondName
        },
        defaults: payload
    })

    return player;
}

export const update = async (id: number, payload: Partial<PlayerInput>): Promise<Player> => {
    const player = await Player.findByPk(id);

    if (!player) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return player.update(payload);
}

export const getById = async (id: number): Promise<Player> => {

    const player = await Player.findByPk(id, {
        include: { all: true, nested: true }
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

export const getAll = async (filters?: GetAllPlayersFilters): Promise<Player[]> => {
    return Player.findAll({
        include: { all: true, nested: true },
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });
}