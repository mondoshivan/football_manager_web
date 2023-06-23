import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Team} from '../models'
import {GetAllTeamsFilters, IncludesFilters} from './types'
import {TeamCreationAttributes} from '../models/team'
import { GetAllNotFoundError, IdNotFoundError, NameNotFoundError } from '../error/error'
import { getIncludes } from './data-access-layer'

export const create = async (payload: TeamCreationAttributes): Promise<Team> => {
    return await Team.create(payload);
}

export const findOrCreate = async (payload: TeamCreationAttributes, includes?: IncludesFilters): Promise<Team> => {
    const [team] = await Team.findOrCreate({
        include: getIncludes(includes),
        where: {
            name: payload.name
        },
        defaults: payload
    })

    return team;
}

export const update = async (id: number, payload: Partial<TeamCreationAttributes>): Promise<Team> => {
    const team = await Team.findByPk(id);

    if (!team) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return await team.update(payload);
}

export const getById = async (id: number, includes?: IncludesFilters): Promise<Team> => {
    const includeList = getIncludes(includes);

    const team = await Team.findByPk(id, {
        include: includeList,
    });

    if (!team) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return team;
}

export const getByName = async (name: string, includes?: IncludesFilters): Promise<Team[]> => {
    const entities = await Team.findAll({
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
    const deletedTeamCount = await Team.destroy({
        where: {id}
    });

    return !!deletedTeamCount; // !! -> converting to boolean
}

export const getAll = async (filters?: GetAllTeamsFilters, includes?: IncludesFilters): Promise<Team[]> => {

    const entities = await Team.findAll({
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

export const checkTeamExists = async (name: string): Promise<boolean> => {
    const teamWithName = await Team.findOne({
        where: {
            name
        }
    });

    return !isEmpty(teamWithName);
}