import "reflect-metadata"; // needed for ts-convict
import { dbInit } from "@football-manager/db-handler";
import log from '@football-manager/log';
import * as championships from './championships';
import * as championshipTeams from './championship-teams';
import * as teams from './teams';

export const start = async () => {
    try {
        await dbInit();

        await championships.initChampionships('./resources/championships.json');
        await teams.initTeams('./resources/teams.json');
        await championshipTeams.initChampionchipTeams('./resources/championship-teams.json');
    } catch (error) {
        log.fatal(error);
    }   
}

start();