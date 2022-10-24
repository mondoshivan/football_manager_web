import { Property } from 'ts-convict';

export class TeamsConfig implements config.TeamsConfig {

    @Property({
        doc: 'Number of initial players per team',
        default: 5,
        env: 'FM_INIT_PLAYER_COUNT'
    })
    public initPlayerCount!: number;
}