import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Club} from '../models'
import {GetAllClubsFilters} from './types'
import {ClubInput, ClubOutput} from '../models/club'

export const create = async (payload: ClubInput): Promise<ClubOutput> => {
    const club = await Club.create(payload)
    return club
}

export const findOrCreate = async (payload: ClubInput): Promise<ClubOutput> => {
    const [club] = await Club.findOrCreate({
        where: {
            name: payload.name
        },
        defaults: payload
    })

    return club;
}

export const update = async (id: number, payload: Partial<ClubInput>): Promise<ClubOutput> => {
    const club = await Club.findByPk(id)

    if (!club) {
        // @todo throw custom error
        throw new Error('not found')
    }

    const updatedClub = await club.update(payload)
    return updatedClub
}

export const getById = async (id: number): Promise<ClubOutput> => {
    const club = await Club.findByPk(id)

    if (!club) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return club
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedClubCount = await Club.destroy({
        where: {id}
    })

    return !!deletedClubCount
}

export const getAll = async (filters?: GetAllClubsFilters): Promise<ClubOutput[]> => {
    return Club.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}

export const checkClubExists = async (name: string): Promise<boolean> => {
    const clubWithName = await Club.findOne({
        where: {
            name
        }
    });

    return !isEmpty(clubWithName)
}