import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Player} from '../models'
import {GetAllPlayersFilters} from './types'
import {PlayerInput, PlayerOutput} from '../models/player'

export const create = async (payload: PlayerInput): Promise<PlayerOutput> => {
    return await Player.create(payload);
}

export const findOrCreate = async (payload: PlayerInput): Promise<PlayerOutput> => {
    const [player] = await Player.findOrCreate({
        where: {
            name: payload.name
        },
        defaults: payload
    })

    return player;
}

export const update = async (id: number, payload: Partial<PlayerInput>): Promise<PlayerOutput> => {
    const player = await Player.findByPk(id);

    if (!player) {
        // @todo throw custom error
        throw new Error('not found');
    }

    return await player.update(payload);
}

export const getById = async (id: number): Promise<PlayerOutput> => {
    const player = await Player.findByPk(id);

    if (!player) {
        // @todo throw custom error
        throw new Error('not found');
    }

    return player;
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedPlayerCount = await Player.destroy({
        where: {id}
    });

    return !!deletedPlayerCount; // !! -> converting to boolean
}

export const getAll = async (filters?: GetAllPlayersFilters): Promise<PlayerOutput[]> => {
    const options = {
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    };

    return Player.findAll(options);
}

export const checkClubExists = async (name: string): Promise<boolean> => {
    const playerWithName = await Player.findOne({
        where: {
            name
        }
    });

    return !isEmpty(playerWithName);
}