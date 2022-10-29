import { calendarController } from "@football-manager/controller";
import { calendarService, championshipService, teamService } from "@football-manager/db-handler";
import config from "./config/config";

export const initCalendars = async () => {

    const teams = await teamService.getAll();
    for (const team of teams) {
        const calendar = await calendarService.create({ type: 'team' });
        await team.addCalendar(calendar);
    }

    const championships = await championshipService.getAll();
    for (const championship of championships) {
        const calendar = await calendarService.create({ type: 'championship' });
        await championship.addCalendar(calendar);

        if (championship.type === 'league') await calendarController.initLeague(championship);

        // add the championship calender to each team of that championship
        for (const team of await championship.getTeams()) {
            team.addCalendar(calendar);
        }
    }
};