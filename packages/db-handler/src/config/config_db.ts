import { Property } from 'ts-convict';

export class DBConfig implements config.DBConfig {

    @Property({
        doc: 'The DB name.',
        default: "football-manager",
        env: 'FM_DB_NAME'
    })
    public name!: string;

    @Property({
        doc: 'The DB user',
        default: "football-manager",
        env: 'FM_DB_USER'
    })
    public user!: string;

    @Property({
        doc: 'The host of the DB',
        default: "localhost",
        env: 'FM_DB_HOST'
    })
    public host!: string;

    @Property({
        doc: 'The driver of the DB',
        default: "sqlite",
        env: 'FM_DB_DIALECT'
    })
    public dialect!: string;

    @Property({
        doc: 'The password of the DB',
        default: "football-manager",
        env: 'FM_DB_PASSWORD'
    })
    public password!: string;
}