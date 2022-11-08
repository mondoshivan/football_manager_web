import * as dal from '../data-access-layer/token-family'
import { GetAllTokenFamiliesFilters, IncludesFilters } from '../data-access-layer/types'
import { TokenFamilyInput } from '../models/token-family'
import { TokenFamily } from '../models'

export const create = async (payload: TokenFamilyInput): Promise<TokenFamily> => {
    return dal.create(payload);
}

export const update = async (id: number, payload: Partial<TokenFamilyInput>): Promise<TokenFamily> => {
    return dal.update(id, payload);
}

export const getById = (id: number, includes?: IncludesFilters): Promise<TokenFamily> => {
    return dal.getById(id, includes);
}

export const deleteById = (id: number): Promise<boolean> => {
    return dal.deleteById(id);
}

export const getAll = (filters?: GetAllTokenFamiliesFilters, includes?: IncludesFilters): Promise<TokenFamily[]> => {
    return dal.getAll(filters, includes);
}