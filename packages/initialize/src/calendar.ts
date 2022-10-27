import { calendarService, teamService } from "@football-manager/db-handler";
import config from "./config/config";

export const initCalendars = async () => {

    const teams = await teamService.getAll();
    const start = new Date(config.calendars.initCalendarStart);

    for (const team of teams) {
        const calendar = await calendarService.create({ start: start });
        await team.setCalendar(calendar);
        await calendar.setTeam(team);
    }
};