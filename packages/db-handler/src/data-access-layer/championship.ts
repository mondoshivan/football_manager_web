import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Championship} from '../models'
import {GetAllChampionshipsFilters} from './types'
import {ChampionshipInput, ChampionshipOutput} from '../models/championship'

export const create = async (payload: ChampionshipInput): Promise<ChampionshipOutput> => {
    const club = await Championship.create(payload)
    return club
}

export const findOrCreate = async (payload: ChampionshipInput): Promise<ChampionshipOutput> => {
    const [club] = await Championship.findOrCreate({
        where: {
            name: payload.name
        },
        defaults: payload
    })

    return club;
}

export const update = async (id: number, payload: Partial<ChampionshipInput>): Promise<ChampionshipOutput> => {
    const club = await Championship.findByPk(id)

    if (!club) {
        // @todo throw custom error
        throw new Error('not found')
    }

    const updatedChampionship = await club.update(payload)
    return updatedChampionship
}

export const getById = async (id: number): Promise<ChampionshipOutput> => {
    const club = await Championship.findByPk(id)

    if (!club) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return club
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedChampionshipCount = await Championship.destroy({
        where: {id}
    })

    return !!deletedChampionshipCount
}

export const getAll = async (filters?: GetAllChampionshipsFilters): Promise<ChampionshipOutput[]> => {
    return Championship.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}

export const checkChampionshipExists = async (name: string): Promise<boolean> => {
    const clubWithName = await Championship.findOne({
        where: {
            name
        }
    });

    return !isEmpty(clubWithName)
}