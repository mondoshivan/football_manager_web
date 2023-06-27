import "reflect-metadata"; // needed for ts-convict
import { dbInit } from "@football-manager/db-handler";
import log from '@football-manager/log';
import * as calendar from './calendar.js';
import * as championships from './championships.js';
import * as championshipTeams from './championship-teams.js';
import * as formation from './formation.js';
import * as game from './game.js';
import * as skills from './skill.js';
import * as teams from './teams.js';
import * as users from './users.js';
import path from "path";
import { config } from "./config/config.js";

export const start = async () => {
    try {
        await dbInit();

        // if (! config.teams.initEnabled) return;

        // await game.initGame();
        // await users.initUsers(path.join(__dirname, '../../resources/users.json'));
        // await formation.initFormations(path.join(__dirname, '../../resources/formations.json'));
        // await skills.initSkills(path.join(__dirname, '../../resources/skills.json'));
        // await championships.initChampionships(path.join(__dirname, '../../resources/championships.json'));
        // await teams.initTeams(path.join(__dirname, '../../resources/teams.json'));
        // await championshipTeams.initChampionchipTeams(path.join(__dirname, '../../resources/championship-teams.json'));
        // await calendar.initCalendars();

    } catch (error) {
        log.fatal(error);
    }   
}