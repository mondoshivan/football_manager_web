import {Association, Includeable, Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Championship} from '../models'
import {GetAllChampionshipsFilters, IncludesFilters} from './types'
import {ChampionshipInput} from '../models/championship'
import { GetAllNotFoundError, IdNotFoundError, NameNotFoundError } from '../error/error'
import { getIncludes } from './data-access-layer'

export const create = async (payload: ChampionshipInput): Promise<Championship> => {
    return await Championship.create(payload);
}

export const findOrCreate = async (payload: ChampionshipInput, includes?: IncludesFilters): Promise<Championship> => {

    const [championship] = await Championship.findOrCreate({
        include: getIncludes(includes),
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
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    const updatedChampionship = await championship.update(payload);
    return updatedChampionship;
}

export const getById = async (id: number, includes?: IncludesFilters): Promise<Championship> => {

    const championship = await Championship.findByPk(id, {
        include: getIncludes(includes)
    });

    if (!championship) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return championship;
}

export const getByName = async (name: string, includes?: IncludesFilters): Promise<Championship[]> => {
    const entities = await Championship.findAll({
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
    const deletedChampionshipCount = await Championship.destroy({
        where: {id}
    })

    return !!deletedChampionshipCount;
}

export const getAll = async (filters?: GetAllChampionshipsFilters, includes?: IncludesFilters): Promise<Championship[]> => {

    const entities = await Championship.findAll({
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

export const checkChampionshipExists = async (name: string): Promise<boolean> => {
    const championshipWithName = await Championship.findOne({
        where: {
            name
        }
    });

    return !isEmpty(championshipWithName);
}