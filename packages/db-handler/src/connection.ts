import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript';
import { config } from "./config/config.js";
import path from 'path';
import { Utils } from '@football-manager/utils';

// const sequelizeConnection = new Sequelize(
//   config.db.name, 
//   config.db.user, 
//   config.db.password, {
//     host: config.db.host,
//     port: config.db.port,
//     dialect: config.db.dialect as Dialect,
//     logging: config.db.logging
//   }
// )

const models = [path.join(Utils.__dirname(import.meta.url), 'models/*.model.js')];

const sequelize = new Sequelize({
  database: config.db.name,
  dialect: config.db.dialect as Dialect,
  username: config.db.user,
  password: config.db.password,
  storage: ':memory:',
  models,
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});

export { sequelize }