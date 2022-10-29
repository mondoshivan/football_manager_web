import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface GameAttributes {
    id: number;
    start: Date;
    day: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface GameInput extends Optional<GameAttributes, 'id'> { }

class Game extends Model<GameAttributes, GameInput> implements GameAttributes {
    public id!: number;
    public start!: Date;
    public day!: Date;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Game.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    day: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: false
});

export default Game;