import { Op } from 'sequelize';
import { User } from '../models';
import { GetAllUsersFilters, IncludesFilters } from './types';
import { UserCreationAttributes } from '../models/user';
import { GetAllNotFoundError, IdNotFoundError, NameNotFoundError } from '../error/error';
import { getIncludes } from './data-access-layer';
import { isEmpty } from 'lodash';
import Utils from "@football-manager/utils";

export const create = async (payload: UserCreationAttributes): Promise<User> => {
    return await User.create(payload);
}

export const findOrCreate = async (payload: UserCreationAttributes, includes?: IncludesFilters): Promise<User> => {
    const [player] = await User.findOrCreate({
        include: getIncludes(includes),
        where: {
            email: payload.email,
            password: payload.password,
        },
        defaults: payload
    })

    return player;
}

export const update = async (id: number, payload: Partial<UserCreationAttributes>): Promise<User> => {
    const player = await User.findByPk(id);

    if (!player) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return player.update(payload);
}

export const getByEmail = async (email: string, includes?: IncludesFilters): Promise<User[]> => {
    const entities = await User.findAll({
        include: getIncludes(includes),
        where: {
            email
        }
    });

    if (!entities) {
        throw new NameNotFoundError(`entity with email '${email}' does not exist`);
    }

    return entities;
}

export const getById = async (id: number, includes?: IncludesFilters): Promise<User> => {

    const player = await User.findByPk(id, {
        include: getIncludes(includes)
    });

    if (!player) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return player;
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedPlayerCount = await User.destroy({
        where: {id}
    });

    return !!deletedPlayerCount; // !! -> converting to boolean
}

export const getByEmailAndPassword = async (email: string, password: string): Promise<User | undefined> => {
    const [user] = await getByEmail(email);
    if (!user) return undefined;

    password = Utils.passwordHash(password, user.salt);
    if (password === user.password) return user;

    return undefined;
};

export const getAll = async (filters?: GetAllUsersFilters, includes?: IncludesFilters): Promise<User[]> => {

    // password must be hashed with salt
    if (filters?.password && filters?.email) {
        const [user] = await getByEmail(filters.email);
        filters.password = Utils.passwordHash(filters.password, user.salt);
    }

    const entities = await User.findAll({
        include: getIncludes(includes),
        where: {
            ...(filters?.email && { email: filters.email }),
            ...(filters?.password && { password: filters.password }),
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });

    if (!entities) {
        throw new GetAllNotFoundError(`nothing found`);
    }

    return entities;
}

export const checkExists = async (email: string): Promise<boolean> => {
    const entityWithName = await User.findOne({
        where: {
            email: email.toLocaleLowerCase()
        }
    });

    return !isEmpty(entityWithName);
}