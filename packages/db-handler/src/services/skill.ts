import {isNil, kebabCase} from 'lodash'

import * as skillDal from '../data-access-layer/skill'
import {GetAllSkillsFilters, IncludesFilters} from '../data-access-layer/types'
import {SkillCreationAttribute} from '../models/skill'
import {Skill} from '../models'

export const create = async (payload: SkillCreationAttribute): Promise<Skill> => {
    return skillDal.create(payload);
}

export const findOrCreate = async (payload: SkillCreationAttribute, includes?: IncludesFilters): Promise<Skill> => {    
    return await skillDal.findOrCreate(payload, includes);
}

export const update = async (id: number, payload: Partial<SkillCreationAttribute>): Promise<Skill> => {    
    return skillDal.update(id, payload);
}

export const getById = (id: number, includes?: IncludesFilters): Promise<Skill> => {
    return skillDal.getById(id, includes);
}

export const deleteById = (id: number): Promise<boolean> => {
    return skillDal.deleteById(id);
}

export const getAll = (filters?: GetAllSkillsFilters, includes?: IncludesFilters): Promise<Skill[]> => {
    return skillDal.getAll(filters, includes);
}