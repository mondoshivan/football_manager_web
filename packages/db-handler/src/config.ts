import { Dialect, Sequelize } from 'sequelize'
import config from "./config/config";

const sequelizeConnection = new Sequelize(
  config.db.name, 
  config.db.user, 
  config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect as Dialect
  }
)

export default sequelizeConnection