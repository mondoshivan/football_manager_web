import "reflect-metadata"; // needed for ts-convict
import { dbInit } from "@football-manager/db-handler";
import log from '@football-manager/log';

import { App } from "./app";
import routers from "./routers/v1";

export const get = () => {
    const apiVersion = 1;
    const port = 8082;
    return new App(apiVersion, routers, port);
};

export const start = async () => {
    await dbInit();
    const app = get();

    try {
        app.listen();
    } catch (error: any) {
        log.error(error)
    }
};

start();