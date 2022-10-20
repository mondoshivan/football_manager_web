import "reflect-metadata"; // needed for ts-convict
import { dbInit } from "@football-manager/db-handler";
import log from '@football-manager/log';
import * as teams from './teams';
import * as players from './players';

export const start = async () => {
    try {
        await dbInit();

        await teams.initTeams('./resources/teams.json');
        await players.initPlayers('./resources/players.json');
    } catch (error) {
        log.fatal(error);
    }   
}

start();