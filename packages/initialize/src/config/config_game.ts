import { Property } from 'ts-convict';

export class GameConfig implements config.GameConfig {

    @Property({
        doc: 'Start date',
        default: '2022-07-01',
        env: 'FM_INIT_GAME_DAY'
    })
    public initGameDay!: string;

}