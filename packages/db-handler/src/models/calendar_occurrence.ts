import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Calendar from './calendar';
import Occurrence from './occurrence';

interface CalendarOccurrenceAttributes {
    id: number;
    CalendarId: number;
    OccurrenceId: number;
    date: Date;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
};

export interface CalendarOccurrenceInput extends Optional<CalendarOccurrenceAttributes, 'id'> {};

class CalendarOccurrence extends Model<CalendarOccurrenceAttributes, CalendarOccurrenceInput> implements CalendarOccurrenceAttributes {
    public id!: number;
    public CalendarId!: number;
    public OccurrenceId!: number;
    public date!: Date;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

CalendarOccurrence.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    CalendarId: {
        type: DataTypes.INTEGER,
        references: {
            model: Calendar,
            key: 'id'
        }
    },
    OccurrenceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Occurrence,
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

Occurrence.belongsToMany(Calendar, {
    through: CalendarOccurrence
});
  
Calendar.belongsToMany(Occurrence, {
    through: CalendarOccurrence
});

export default CalendarOccurrence;