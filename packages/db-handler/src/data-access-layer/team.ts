import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Team} from '../models'
import {GetAllTeamsFilters} from './types'
import {TeamInput} from '../models/team'
import { IdNotFoundError, NameNotFoundError } from '../error/error'

export const create = async (payload: TeamInput): Promise<Team> => {
    return await Team.create(payload);
}

export const findOrCreate = async (payload: TeamInput): Promise<Team> => {
    const [team] = await Team.findOrCreate({
        include: { all: true, nested: true },
        where: {
            name: payload.name
        },
        defaults: payload
    })

    return team;
}

export const update = async (id: number, payload: Partial<TeamInput>): Promise<Team> => {
    const team = await Team.findByPk(id);

    if (!team) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return await team.update(payload);
}

export const getById = async (id: number): Promise<Team> => {
    const team = await Team.findByPk(id, {
        include: { all: true, nested: true },
    });

    if (!team) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return team;
}

export const getByName = async (name: string): Promise<Team[]> => {
    const entities = await Team.findAll({
        include: { all: true, nested: true },
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
    const deletedTeamCount = await Team.destroy({
        where: {id}
    });

    return !!deletedTeamCount; // !! -> converting to boolean
}

export const getAll = async (filters?: GetAllTeamsFilters): Promise<Team[]> => {
    return Team.findAll({
        include: { all: true, nested: true },
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });
}

export const checkClubExists = async (name: string): Promise<boolean> => {
    const teamWithName = await Team.findOne({
        include: { all: true, nested: true },
        where: {
            name
        }
    });

    return !isEmpty(teamWithName);
}