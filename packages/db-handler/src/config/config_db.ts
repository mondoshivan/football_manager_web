import { Property } from 'ts-convict';

export class DBConfig implements config.DBConfig {

    @Property({
        doc: 'Name of the documentation directory.',
        default: "doc",
        env: 'FM_DB_ERM_DOC_DIR'
    })
    public docDir!: string;

    @Property({
        doc: 'Name of the generated ERM-Diagram.',
        default: "football_manager.svg",
        env: 'FM_DB_ERM_DIAGRAM_NAME'
    })
    public ermName!: string;

    @Property({
        doc: 'Recreate the tables.',
        default: false,
        env: 'FM_DB_FORCE'
    })
    public force!: boolean;

    @Property({
        doc: 'The DB name.',
        default: "football_manager",
        env: 'FM_DB_NAME'
    })
    public name!: string;

    @Property({
        doc: 'The DB user',
        default: "football_manager",
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
        doc: 'The port of the DB',
        default: "3306",
        env: 'FM_DB_PORT'
    })
    public port!: number;

    @Property({
        doc: 'The driver of the DB',
        default: "sqlite",
        env: 'FM_DB_DIALECT'
    })
    public dialect!: string;

    @Property({
        doc: 'The password of the DB',
        default: "football_manager",
        env: 'FM_DB_PASSWORD'
    })
    public password!: string;

    @Property({
        doc: 'Enables the logging of mysql commands',
        default: true,
        env: 'FM_DB_LOGGING'
    })
    public logging!: boolean;
}