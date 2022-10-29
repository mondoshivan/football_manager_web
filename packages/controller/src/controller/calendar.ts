import { Calendar, Championship } from "@football-manager/db-handler/src/models/index";
import * as calendarHelper from "../helper/calendar";
import { occurrenceService, gameService } from "@football-manager/db-handler";
import { isEmpty } from "lodash";

const initOccurrence = async (type : string, weekDate : Date, weekCounter : number, calendar : Calendar) => {
    const [occurrence] = await occurrenceService.getByType(type);
    
    await calendar.addOccurrence(occurrence, {
        through: {
            date: weekDate
        }
    });
}

export const initLeague = async (championship: Championship) => {
    const teams = await championship.getTeams();
    const [calendar] = await championship.getCalendars();
    const [game] = await gameService.getAll();

    if (!calendar) throw new Error('no calendar');
    if (!game) throw new Error('no game');
    if (isEmpty(teams)) throw new Error('no teams');

    const gamesTotal = teams.length * 2 - 2;
    const weeksPerYear = 52;
    const freeWeeks = weeksPerYear - gamesTotal;
    const freeWeeksSummer = freeWeeks * 2 / 3;
    const freeWeeksWinter = freeWeeks / 3;
    const freeWeeksBeginningOfSeason = freeWeeksSummer / 2;
    const startWeek = freeWeeksBeginningOfSeason + 1;
    const startWeekSecondHalfOfSeason = startWeek + gamesTotal / 2 + freeWeeksWinter;
    const start = calendarHelper.getNextDayOfWeek('saturday', game.start);
    const season: { [key: string]: number } = {}
    let weekCounter = startWeek;

    for (let i = 1; i <= gamesTotal / 2; i++) {
        season[weekCounter.toString()] = i;
        const weekDate = calendarHelper.addDaysToDate(start, weekCounter * 7);
        await initOccurrence('game', weekDate, weekCounter, calendar);
        weekCounter++;
    }

    weekCounter = startWeekSecondHalfOfSeason;

    for (let i = gamesTotal / 2 + 1; i <= gamesTotal; i++) {
        season[weekCounter.toString()] = i;
        const weekDate = calendarHelper.addDaysToDate(start, weekCounter * 7);
        await initOccurrence('game', weekDate, weekCounter, calendar);
        weekCounter++;
    }
};