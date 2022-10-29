import "reflect-metadata"; // needed for ts-convict
import { dbInit } from "@football-manager/db-handler";
import log from '@football-manager/log';
import * as calendar from './calendar';
import * as calendarOccurrences from './calendar-occurrence';
import * as championships from './championships';
import * as championshipTeams from './championship-teams';
import * as occurrences from './occurrences';
import * as formation from './formation';
import * as game from './game';
import * as skills from './skill';
import * as teams from './teams';
import path from "path";
import config from "./config/config";

export const start = async () => {
    try {
        await dbInit();

        if (! config.teams.initEnabled) return;

        await game.initGame();
        await occurrences.initOccurrences(path.join(__dirname, '../../resources/events.json'));
        await formation.initFormations(path.join(__dirname, '../../resources/formations.json'));
        await skills.initSkills(path.join(__dirname, '../../resources/skills.json'));
        await championships.initChampionships(path.join(__dirname, '../../resources/championships.json'));
        await teams.initTeams(path.join(__dirname, '../../resources/teams.json'));
        await championshipTeams.initChampionchipTeams(path.join(__dirname, '../../resources/championship-teams.json'));
        await calendar.initCalendars();
        await calendarOccurrences.initCalendarOccurrences();

    } catch (error) {
        log.fatal(error);
    }   
}