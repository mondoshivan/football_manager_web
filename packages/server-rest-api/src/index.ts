import "reflect-metadata"; // needed for ts-convict
import log from '@football-manager/log';
import * as initialize from '@football-manager/initialize';

import { App } from "./app.js";
import routers from "./routers/v1/index.js";

export const get = () => {
    const apiVersion = 1;
    const port = 8082;
    return new App(apiVersion, routers, port);
};

export const start = async () => {
    try {
        await initialize.start();
        const app = get();
        app.listen();
    } catch (error: any) {
        log.error(error)
    }
};

start();