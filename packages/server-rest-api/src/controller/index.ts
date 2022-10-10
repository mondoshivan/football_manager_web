import express from "express";
import { Controller } from "./controller";

export class IndexController extends Controller {

    constructor() {
        super();

        this.path = '/index';

        this.router.get('/', (request: express.Request, response: express.Response) => {
            response.contentType('json');
            response.send({ say: 'hello' });
        });
    }

}