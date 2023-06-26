import { Calendar, Championship } from "@football-manager/db-handler/src/models/index.js";
import { calendarHelper } from "@football-manager/helper";
import { occurrenceService, appService } from "@football-manager/db-handler";
import { isEmpty } from "lodash";
import { OccurrenceTypes } from "@football-manager/db-handler/src/models/occurrence.js";

const initOccurrence = async (type : OccurrenceTypes, weekDate : Date, weekCounter : number, calendar : Calendar) => {
    const occurrence = await occurrenceService.create({ type: type, date: weekDate});
    
    await calendar.addOccurrence(occurrence);
}

export const initLeague = async (championship: Championship) => {
    const teams = await championship.getTeams();
    const [calendar] = await championship.getCalendars();
    const [game] = await appService.getAll();

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