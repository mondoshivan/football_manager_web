import "reflect-metadata"; // needed for ts-convict
import { dbInit } from "@football-manager/db-handler";
import log from '@football-manager/log';
import * as calender from './calendar';
import * as championships from './championships';
import * as championshipTeams from './championship-teams';
import * as formation from './formation';
import * as skills from './skill';
import * as teams from './teams';
import path from "path";
import config from "./config/config";

export const start = async () => {
    try {
        await dbInit();

        if (! config.teams.initEnabled) return;


        await formation.initFormations(path.join(__dirname, '../../resources/formations.json'));
        await skills.initSkills(path.join(__dirname, '../../resources/skills.json'));
        await championships.initChampionships(path.join(__dirname, '../../resources/championships.json'));
        await teams.initTeams(path.join(__dirname, '../../resources/teams.json'));
        await championshipTeams.initChampionchipTeams(path.join(__dirname, '../../resources/championship-teams.json'));
        await calender.initCalenders();
    } catch (error) {
        log.fatal(error);
    }   
}