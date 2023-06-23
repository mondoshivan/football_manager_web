import * as dal from '../data-access-layer/token'
import {GetAllTokensFilters, IncludesFilters} from '../data-access-layer/types'
import {TokenCreationAttributes} from '../models/token'
import {Token} from '../models/index'

export const create = async (payload: TokenCreationAttributes): Promise<Token> => {
    return dal.create(payload);
}

export const update = async (id: number, payload: Partial<TokenCreationAttributes>): Promise<Token> => {    
    return dal.update(id, payload);
}

export const getById = (id: number, includes?: IncludesFilters): Promise<Token> => {
    return dal.getById(id, includes);
}

export const getBySignature = (signature: string, includes?: IncludesFilters): Promise<Token[]> => {
    return dal.getBySignature(signature, includes);
}

export const deleteById = (id: number): Promise<boolean> => {
    return dal.deleteById(id);
}

export const getAll = (filters?: GetAllTokensFilters, includes?: IncludesFilters): Promise<Token[]> => {
    return dal.getAll(filters, includes);
}