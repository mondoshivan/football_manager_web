import { Property } from 'ts-convict';

export class CalendarConfig implements config.CalendarConfig {

    @Property({
        doc: 'Start date',
        default: '2022-07-01',
        env: 'FM_INIT_CALENDER_START'
    })
    public initCalendarStart!: string;

}