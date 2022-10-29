import "reflect-metadata"; // needed for ts-convict

import { writeFileSync } from "fs";
import sequelizeConnection from './config';
import config from "./config/config";
import sequelizeErd from 'sequelize-erd';
import { dbInit } from "./index";

(async function () {
    await dbInit();
    const svg = await sequelizeErd({ source: sequelizeConnection }); // sequelizeErd() returns a Promise
    writeFileSync(`./${config.db.ermName}`, svg);

})();