import Utils from '@football-manager/utils';
import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

export type RoleTypes = 'user' | 'admin';

export interface UserInput  { 
    name: string;
    email: string;
    password: string;
}

interface UserAttributes extends UserInput{
    id: number;   
    salt: string;
    confirmed: boolean;
    role: RoleTypes;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number
    public name!: string
    public email!: string
    public password!: string
    public salt!: string
    public confirmed!: boolean
    public role!: RoleTypes

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: "user"
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    hooks: {
        beforeValidate: function (user) {
            user.confirmed = false;
            user.role = 'user';
            user.email = user.email.toLowerCase();
            user.salt = Utils.uuid();
            user.password = Utils.passwordHash(user.password, user.salt);
        }
    }
});

export default User