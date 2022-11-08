import { Op } from 'sequelize';
import { TokenFamily } from '../models';
import { GetAllTokenFamiliesFilters, IncludesFilters } from './types';
import { TokenFamilyInput } from '../models/token-family';
import { GetAllNotFoundError, IdNotFoundError } from '../error/error';
import { getIncludes } from './data-access-layer';

export const create = async (payload: TokenFamilyInput): Promise<TokenFamily> => {
    return await TokenFamily.create(payload);
}

export const update = async (id: number, payload: Partial<TokenFamilyInput>): Promise<TokenFamily> => {
    const player = await TokenFamily.findByPk(id);

    if (!player) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return player.update(payload);
}

export const getById = async (id: number, includes?: IncludesFilters): Promise<TokenFamily> => {

    const entity = await TokenFamily.findByPk(id, {
        include: getIncludes(includes)
    });

    if (!entity) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return entity;
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedCount = await TokenFamily.destroy({
        where: {id}
    });

    return !!deletedCount; // !! -> converting to boolean
}

export const getAll = async (filters?: GetAllTokenFamiliesFilters, includes?: IncludesFilters): Promise<TokenFamily[]> => {

    const entities = await TokenFamily.findAll({
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