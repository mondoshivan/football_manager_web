import {Op} from 'sequelize'
import {isEmpty} from 'lodash'

import {Skill} from '../models'
import {GetAllSkillsFilters} from './types'
import {SkillInput} from '../models/skill'
import { IdNotFoundError } from '../error/error'

export const create = async (payload: SkillInput): Promise<Skill> => {
    return await Skill.create(payload);
}

export const findOrCreate = async (payload: SkillInput): Promise<Skill> => {
    const [skill] = await Skill.findOrCreate({
        include: { all: true, nested: true },
        where: {
            name: payload.name,
            type: payload.type
        },
        defaults: payload
    })

    return skill;
}

export const update = async (id: number, payload: Partial<SkillInput>): Promise<Skill> => {
    const skill = await Skill.findByPk(id);

    if (!skill) {
        throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return skill.update(payload);
}

export const getById = async (id: number): Promise<Skill> => {

    const skill = await Skill.findByPk(id, {
        include: { all: true, nested: true }
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

export const getAll = async (filters?: GetAllSkillsFilters): Promise<Skill[]> => {
    return Skill.findAll({
        include: { all: true, nested: true },
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });
}