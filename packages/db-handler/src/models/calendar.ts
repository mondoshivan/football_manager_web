import { BelongsToCreateAssociationMixin, BelongsToManyAddAssociationMixin, DataTypes, HasManyAddAssociationMixin, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Occurrence from './occurrence';

export type CalendarTypes = 'championship' | 'team' | 'player';

interface CalendarAttributes {
    id: number;
    type: CalendarTypes;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface CalendarInput extends Optional<CalendarAttributes, 'id'> { }

class Calendar extends Model<CalendarAttributes, CalendarInput> implements CalendarAttributes {
    public id!: number;
    public type!: CalendarTypes;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    declare addOccurrence: HasManyAddAssociationMixin<Occurrence, Occurrence['id']>;
}

Calendar.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('championship', 'team', 'player'),
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
});

export default Calendar;