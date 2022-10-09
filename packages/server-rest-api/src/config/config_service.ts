import { Property } from 'ts-convict';

export class ServiceConfig implements config.ServiceConfig {

    @Property({
        doc: 'The location of the front-end.',
        default: "node_modules/@sequencer-localizator-webservice/server-front-end/dist/server-front-end",
        env: 'SLW_SERVICE_FRONT_END_DIR',
    })
    public frontEndDir!: string;

    @Property({
        doc: 'The server port.',
        default: 8082,
        env: 'SLW_SERVICE_PORT',
        type: 'int'
    })
    public port!: number;
}