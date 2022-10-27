import { Property } from 'ts-convict';

export class CalenderConfig implements config.CalenderConfig {

    @Property({
        doc: 'Start date',
        default: '2022-07-01',
        env: 'FM_INIT_CALENDER_START'
    })
    public initCalenderStart!: string;

}