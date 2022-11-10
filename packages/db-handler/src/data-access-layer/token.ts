import { Op } from 'sequelize';
import { Token } from '../models/index';
import { GetAllTokensFilters, IncludesFilters } from './types';
import { TokenInput } from '../models/token';
import { GetAllNotFoundError, IdNotFoundError, NameNotFoundError } from '../error/error';
import { getIncludes } from './data-access-layer';

export const create = async (payload: TokenInput): Promise<Token> => {
    return await Token.create(payload);
}

export const update = async (id: number, payload: Partial<TokenInput>): Promise<Token> => {
    const player = await Token.findByPk(id);

    if (!player) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return player.update(payload);
}

export const getById = async (id: number, includes?: IncludesFilters): Promise<Token> => {

    const entity = await Token.findByPk(id, {
        include: getIncludes(includes)
    });

    if (!entity) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return entity;
}

export const getBySignature = async (signature: string, includes?: IncludesFilters): Promise<Token[]> => {
    const entities = await Token.findAll({
        include: getIncludes(includes),
        where: {
            signature
        }
    });

    if (!entities) {
        throw new NameNotFoundError(`entity with signature '${signature}' does not exist`);
    }

    return entities;
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedCount = await Token.destroy({
        where: {id}
    });

    return !!deletedCount; // !! -> converting to boolean
}

export const getAll = async (filters?: GetAllTokensFilters, includes?: IncludesFilters): Promise<Token[]> => {

    const entities = await Token.findAll({
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