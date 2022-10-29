import { championshipService } from "@football-manager/db-handler";

import { calendarController } from '@football-manager/controller'


export const initCalendarOccurrences = async () => {

    const championships = await championshipService.getAll();

    for (const championship of championships) {
        if (championship.type === 'league') await calendarController.initLeague(championship);
    }
};
