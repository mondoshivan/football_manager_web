import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript';
import { config } from "./config/config";
import path from 'path';
import { Utils } from '@football-manager/utils';

// try ot the the packages dir, 
// if it fails try relative path as fallback
const packageDir = Utils.getPackagesDir() || '../';

const sequelize = new Sequelize({
  database: config.db.name,
  dialect: config.db.dialect as Dialect,
  username: config.db.user,
  password: config.db.password,
  host: config.db.host,
  port: config.db.port,
  logging: config.db.logging,
  storage: ':memory:',
  models: [path.join(packageDir, 'db-handler/src/models/*.model.ts')],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')).replace('-', '') === member.toLowerCase();
  },
});

export { sequelize }