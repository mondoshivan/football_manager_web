import {Association, Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Championship} from '../models'
import {GetAllChampionshipsFilters} from './types'
import {ChampionshipInput} from '../models/championship'

export const create = async (payload: ChampionshipInput): Promise<Championship> => {
    return await Championship.create(payload);
}

export const findOrCreate = async (payload: ChampionshipInput): Promise<Championship> => {

    const [championship] = await Championship.findOrCreate({
        include: { all: true, nested: true },
        where: {
            name: payload.name
        },
        defaults: payload
    });

    return championship;
}

export const update = async (id: number, payload: Partial<ChampionshipInput>): Promise<Championship> => {
    const championship = await Championship.findByPk(id);

    if (!championship) {
        // @todo throw custom error
        throw new Error('not found');
    }

    const updatedChampionship = await championship.update(payload);
    return updatedChampionship;
}

export const getById = async (id: number): Promise<Championship> => {

    const championship = await Championship.findByPk(id, {
        include: { all: true, nested: true }
    });

    if (!championship) {
        // @todo throw custom error
        throw new Error('not found');
    }

    return championship;
}

export const getByName = async (name: string): Promise<Championship[]> => {
    return Championship.findAll({
        include: { all: true, nested: true },
        where: {
            name
        }
    });
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedChampionshipCount = await Championship.destroy({
        where: {id}
    })

    return !!deletedChampionshipCount;
}

export const getAll = async (filters?: GetAllChampionshipsFilters): Promise<Championship[]> => {
    return Championship.findAll({
        include: { all: true, nested: true },
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });
}

export const checkChampionshipExists = async (name: string): Promise<boolean> => {
    const championshipWithName = await Championship.findOne({
        where: {
            name
        }
    });

    return !isEmpty(championshipWithName);
}