import { BelongsToCreateAssociationMixin, DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Team from './team';

interface CalendarAttributes {
    id: number;
    start: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface CalendarInput extends Optional<CalendarAttributes, 'id'> { }

class Calendar extends Model<CalendarAttributes, CalendarInput> implements CalendarAttributes {
    public id!: number;
    public start!: Date;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    declare setTeam: BelongsToCreateAssociationMixin<Team>;
}

Calendar.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
});

export default Calendar;