import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

import { Player, Skill } from '.';

export interface PlayerSkillAttributes {
    id: number;
    PlayerId: number;
    SkillId: number;
    value: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
};

export interface PlayerSkillInput extends Optional<PlayerSkillAttributes, 'id'> {};

class PlayerSkill extends Model<PlayerSkillAttributes, PlayerSkillInput> implements PlayerSkillAttributes {
    public id!: number;
    public PlayerId!: number;
    public SkillId!: number;
    public value!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

PlayerSkill.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    PlayerId: {
        type: DataTypes.INTEGER,
        references: {
            model: Player,
            key: 'id'
        }
    },
    SkillId: {
        type: DataTypes.INTEGER,
        references: {
            model: Skill,
            key: 'id'
        }
    },
    value: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true
})

Skill.belongsToMany(Player, {
    through: PlayerSkill
});
  
Player.belongsToMany(Skill, {
    through: PlayerSkill
});

export default PlayerSkill;