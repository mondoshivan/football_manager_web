import {isNil, kebabCase} from 'lodash'

import * as dal from '../data-access-layer/user'
import {GetAllUsersFilters, IncludesFilters} from '../data-access-layer/types'
import {UserInput} from '../models/user'
import {User} from '../models'

export const create = async (payload: UserInput): Promise<User> => {
    return dal.create(payload);
}

export const findOrCreate = async (payload: UserInput, includes?: IncludesFilters): Promise<User> => {    
    return await dal.findOrCreate(payload, includes);
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<User> => {    
    return dal.update(id, payload);
}

export const getById = (id: number, includes?: IncludesFilters): Promise<User> => {
    return dal.getById(id, includes);
}

export const deleteById = (id: number): Promise<boolean> => {
    return dal.deleteById(id);
}

export const getAll = (filters?: GetAllUsersFilters, includes?: IncludesFilters): Promise<User[]> => {
    return dal.getAll(filters, includes);
}

export const checkExists = (email: string): Promise<boolean> => {
    return dal.checkExists(email);
}

export const getByEmailAndPassword = (email: string, password: string): Promise<User | undefined> => {
    return dal.getByEmailAndPassword(email, password);
}