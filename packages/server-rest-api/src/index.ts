import "reflect-metadata"; // needed for ts-convict
import { dbInit } from "@football-manager/db-handler";

import { App } from "./app";
import routers from "./routers/v1";

const run = async () => {
    await dbInit();

    const apiVersion = 1;
    const port = 8082;

    const app = new App(apiVersion, routers, port);

    app.listen();
}

run();