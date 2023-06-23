import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Skill} from '../models'
import {GetAllSkillsFilters, IncludesFilters} from './types'
import {SkillCreationAttribute} from '../models/skill'
import { GetAllNotFoundError, IdNotFoundError } from '../error/error'
import { getIncludes } from './data-access-layer'

export const create = async (payload: SkillCreationAttribute): Promise<Skill> => {
    return await Skill.create(payload);
}

export const findOrCreate = async (payload: SkillCreationAttribute, includes?: IncludesFilters): Promise<Skill> => {
    const [skill] = await Skill.findOrCreate({
        include: getIncludes(includes),
        where: {
            name: payload.name,
            type: payload.type
        },
        defaults: payload
    })

    return skill;
}

export const update = async (id: number, payload: Partial<SkillCreationAttribute>): Promise<Skill> => {
    const skill = await Skill.findByPk(id);

    if (!skill) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return skill.update(payload);
}

export const getById = async (id: number, includes?: IncludesFilters): Promise<Skill> => {

    const skill = await Skill.findByPk(id, {
        include: getIncludes(includes)
    });

    if (!skill) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return skill;
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedSkillCount = await Skill.destroy({
        where: {id}
    });

    return !!deletedSkillCount; // !! -> converting to boolean
}

export const getAll = async (filters?: GetAllSkillsFilters, includes?: IncludesFilters): Promise<Skill[]> => {
    const entities = await Skill.findAll({
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