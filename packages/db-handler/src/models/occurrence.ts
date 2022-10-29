import { BelongsToManyAddAssociationMixin, DataTypes, HasManySetAssociationsMixin, Model, NonAttribute, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Skill from './skill';
import Team, { TeamInput } from './team';

export type OccurrenceTypes = 'game' | 'training' | 'payday';

interface OccurrenceAttributes {
    id: number;
    type: OccurrenceTypes;
    visible: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface OccurrenceInput extends Optional<OccurrenceAttributes, 'id'> {}

class Occurrence extends Model<OccurrenceAttributes, OccurrenceInput> implements OccurrenceAttributes {
    public id!: number
    public type!: OccurrenceTypes
    public visible!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Occurrence.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('game', 'training', 'payday'),
        allowNull: false
    },
    visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default Occurrence