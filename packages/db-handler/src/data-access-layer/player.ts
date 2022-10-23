import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Player} from '../models'
import {GetAllPlayersFilters} from './types'
import {PlayerInput} from '../models/player'

export const create = async (payload: PlayerInput): Promise<Player> => {
    return await Player.create(payload);
}

export const findOrCreate = async (payload: PlayerInput): Promise<Player> => {
    const [player] = await Player.findOrCreate({
        include: Object.keys(Player.associations).map(key => Player.associations[key]),
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
        // @todo throw custom error
        throw new Error('not found');
    }

    return player.update(payload);
}

export const getById = async (id: number): Promise<Player> => {
    const options = {
        include: Object.keys(Player.associations).map(key => Player.associations[key])
    };

    const player = await Player.findByPk(id, options);

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

export const getAll = async (filters?: GetAllPlayersFilters): Promise<Player[]> => {

    const options = {
        include: Object.keys(Player.associations).map(key => Player.associations[key]),
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    };

    return Player.findAll(options);
}