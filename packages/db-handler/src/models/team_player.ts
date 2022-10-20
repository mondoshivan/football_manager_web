import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

import { Team, Player } from '.';

interface TeamPlayerAttributes {
    id: number;
    TeamId: number;
    PlayerId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
};

export interface TeamPlayerInput extends Optional<TeamPlayerAttributes, 'id'> {};
export interface TeamPlayerOutput extends TeamPlayerInput {};

class TeamPlayer extends Model<TeamPlayerAttributes, TeamPlayerInput> implements TeamPlayerAttributes {
    public id!: number;
    public TeamId!: number;
    public PlayerId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

TeamPlayer.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    TeamId: {
        type: DataTypes.INTEGER,
        references: {
            model: Team,
            key: 'id'
        }
    },
    PlayerId: {
        type: DataTypes.INTEGER,
        references: {
            model: Player,
            key: 'id'
        }
    }
}, {
  sequelize: sequelizeConnection
})

Player.belongsToMany(Team, {
    through: TeamPlayer
});
  
Team.belongsToMany(Player, {
    through: TeamPlayer
});

export default TeamPlayer;