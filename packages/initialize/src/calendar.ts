import { calenderService, teamService } from "@football-manager/db-handler";
import config from "./config/config";

export const initCalenders = async () => {

    const teams = await teamService.getAll();
    const start = new Date(config.calenders.initCalenderStart);

    for (const team of teams) {
        const calender = await calenderService.create({ start: start });
        await team.setCalender(calender);
        await calender.setTeam(team);
    }
};