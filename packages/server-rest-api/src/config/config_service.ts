import { Property } from 'ts-convict';

export class ServiceConfig implements config.ServiceConfig {

    @Property({
        doc: 'The location of the front-end.',
        default: "node_modules/@football-manager/front-end/dist/front-end",
        env: 'FM_SERVICE_FRONT_END_DIR',
    })
    public frontEndDir!: string;

    @Property({
        doc: 'The express session secret.',
        default: "2B189552-BCF9-45B2-B140-FADB97C22B76",
        env: 'FM_SERVICE_SESSION_SECRET',
    })
    public sessionSecret!: string;

    @Property({
        doc: 'Enables a secure cookie, but this requires a HTTPS connection!',
        default: true,
        env: 'FM_SERVICE_SESSION_SECURE',
    })
    public sessionCookieSecure!: boolean;

    @Property({
        doc: 'The server port.',
        default: 8082,
        env: 'FM_SERVICE_PORT',
        type: 'int'
    })
    public port!: number;

    @Property({
        doc: 'The JWT secret.',
        default: "2B189552-BCF9-45B2-B140-FADB97C22B76",
        env: 'FM_SERVICE_JWT_SECRET',
    })
    public jwtSecret!: string;
}