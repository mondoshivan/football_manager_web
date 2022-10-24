import "reflect-metadata"; // needed for ts-convict
import { dbInit } from "@football-manager/db-handler";
import log from '@football-manager/log';
import * as championships from './championships';
import * as championshipTeams from './championship-teams';
import * as teams from './teams';
import path from "path";

export const start = async () => {
    try {
        await dbInit();

        await championships.initChampionships(path.join(__dirname, '../../resources/championships.json'));
        await teams.initTeams(path.join(__dirname, '../../resources/teams.json'));
        await championshipTeams.initChampionchipTeams(path.join(__dirname, '../../resources/championship-teams.json'));
    } catch (error) {
        log.fatal(error);
    }   
}