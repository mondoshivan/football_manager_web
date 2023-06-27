import { Model } from 'sequelize-typescript';
import { Attributes, CreateOptions, CreationAttributes, DestroyOptions, Includeable, ModelStatic, WhereOptions } from 'sequelize';
import { IncludesFilters, NestedByName } from "./types.js";
import { sequelize } from "../connection.js";
import { GetAllNotFoundError, IdNotFoundError } from '../error/error.js';


export class BaseDal<T extends Model> {

  constructor(protected model: ModelStatic<T>) {

  }

  nestedIncludes(includes: NestedByName[] | undefined): Includeable[] {
    return (includes || []).map(i => {
      return {
        model: sequelize.model(i.name),
        include: this.nestedIncludes(i.includes)
      }
    });
  }

  getIncludes(includes?: IncludesFilters): Includeable | Includeable[] | undefined {
    if (includes?.includeNestedByName) return this.nestedIncludes(includes.includeNestedByName);
    if (includes?.includeByName) return sequelize.model(includes.includeByName);
    if (includes?.includeNested) return { all: true, nested: true };
    if (includes?.includeAll) return { all: true };

    return;
  }

  public async create(payload: CreationAttributes<T>, options?: CreateOptions<T>) {
    return this.model.create(payload, options);
  }

  public async findOrCreate(payload: CreationAttributes<T>, options?: CreateOptions<T>) {
    return this.model.findOrCreate({ where: payload, ...options });
  }

  public async findOne(options?: WhereOptions<Attributes<T>>) {
    return this.model.findOne({ where: options });
  }

  public async getById(id: number, includes?: IncludesFilters) {
    const one = await this.model.findByPk(id, {
      include: this.getIncludes(includes),
    });

    if (!one) {
      throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return one;
  }

  public async getAll(filters?: WhereOptions<Attributes<T>>, includes?: IncludesFilters) {

    const entities = await this.model.findAll({
      include: this.getIncludes(includes),
      where: filters
    });

    if (!entities) {
      throw new GetAllNotFoundError(`nothing found`);
    }

    return entities;
  }

  public async destroy(options?: DestroyOptions<Attributes<T>>) {
    return await this.model.destroy(options);
  }

  public async update(id: number, payload: Partial<CreationAttributes<T>>) {
    const one = await this.model.findByPk(id);

    if (!one) {
      throw new IdNotFoundError(`entity with id ${id} does not exist`);
    }

    return await one.update(payload);
  }
}