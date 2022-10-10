import "reflect-metadata"; // needed for ts-convict
import { App } from "./app";
import { IndexController } from "./controller/index";

const restApiRoute = '/rest-api';

const controllers = [
    {
        route: restApiRoute,
        version: 1,
        controller: new IndexController()
    }
];

const port = 8082;

const app = new App(controllers, port);

app.listen();