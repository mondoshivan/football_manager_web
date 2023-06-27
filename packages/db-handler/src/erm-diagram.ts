import "reflect-metadata"; // needed for ts-convict

import { mkdirSync, writeFileSync } from "fs";
import { sequelize } from './connection.js';
import { config } from "./config/config.js";
import sequelizeErd from 'sequelize-erd';
import { dbInit } from "./index.js";
import path from "path";

(async function () {
    await dbInit();
    const svg = await sequelizeErd({ 
        source: sequelize,
        engine: 'neato' // neato, dot
    });
    const file = path.join(config.db.docDir, config.db.ermName)
    mkdirSync(config.db.docDir, { recursive: true });
    writeFileSync(path.join(file), svg);

})();