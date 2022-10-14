import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Team} from '../models'
import {GetAllTeamsFilters} from './types'
import {TeamInput, TeamOutput} from '../models/team'

export const create = async (payload: TeamInput): Promise<TeamOutput> => {
    return await Team.create(payload);
}

export const findOrCreate = async (payload: TeamInput): Promise<TeamOutput> => {
    const [team] = await Team.findOrCreate({
        where: {
            name: payload.name
        },
        defaults: payload
    })

    return team;
}

export const update = async (id: number, payload: Partial<TeamInput>): Promise<TeamOutput> => {
    const team = await Team.findByPk(id);

    if (!team) {
        // @todo throw custom error
        throw new Error('not found');
    }

    return await team.update(payload);
}

export const getById = async (id: number): Promise<TeamOutput> => {
    const team = await Team.findByPk(id);

    if (!team) {
        // @todo throw custom error
        throw new Error('not found');
    }

    return team;
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedTeamCount = await Team.destroy({
        where: {id}
    });

    return !!deletedTeamCount; // !! -> converting to boolean
}

export const getAll = async (filters?: GetAllTeamsFilters): Promise<TeamOutput[]> => {
    const options = {
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    };

    return Team.findAll(options);
}

export const checkClubExists = async (name: string): Promise<boolean> => {
    const teamWithName = await Team.findOne({
        where: {
            name
        }
    });

    return !isEmpty(teamWithName);
}