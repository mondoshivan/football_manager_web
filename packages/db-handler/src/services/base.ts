import { Attributes, CreationAttributes, DestroyOptions, FindOptions, WhereOptions } from "sequelize";
import { Model, ModelStatic } from "sequelize-typescript";
import { BaseDal } from "../data-access-layer/base.js";
import { IncludesFilters } from "../data-access-layer/types.js";


export class BaseService<T extends Model> {

  constructor(
    protected dataAccessLayer: BaseDal<T>
  ) {}

  public async create(payload: CreationAttributes<T>) {
    return this.dataAccessLayer.create(payload);
  }

  public async findOrCreate(payload: CreationAttributes<T>) {
    return this.dataAccessLayer.findOrCreate(payload);
  }

  public async getById(id: number, includes: IncludesFilters) {
    return this.dataAccessLayer.getById(id, includes);
  }

  public async findOne(options?: WhereOptions<Attributes<T>>) {
    return this.dataAccessLayer.findOne(options);
  }

  public async getAll(filters?: WhereOptions<Attributes<T>>, includes?: IncludesFilters) {
    return this.dataAccessLayer.getAll(filters, includes);
  }

  public async destroy(options?: DestroyOptions<Attributes<T>>) {
    return this.dataAccessLayer.destroy(options);
  }

  public async update(id: number, payload: Partial<CreationAttributes<T>>) {
    return this.dataAccessLayer.update(id, payload);
  }

}