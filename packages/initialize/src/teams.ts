import { readFileSync } from "fs";

import { playerService, teamService } from "@football-manager/db-handler";
import { TeamInput } from "@football-manager/db-handler/src/models/team";
import { nameService } from "@football-manager/names";
import config from "./config/config";
import Utils from "@football-manager/utils";
import { Country } from "@football-manager/names/src/services/name-service";

export const initTeams = async (resource: string) => {

    const raw = readFileSync(resource);
    const list : TeamInput[] = JSON.parse(raw.toString());
    let countryNames : Country[] = [];
    countryNames.push('de');
    countryNames.push('gb');
    countryNames.push('dk');
    countryNames.push('nl');
    countryNames.push('fr');
    countryNames.push('es');
    countryNames.push('it');
    
    for (const teamConfig of list) {
        const team = await teamService.create(teamConfig);

        for (let i=0; i<config.teams.initPlayerCount; i++) {
            const firstName = nameService().firstName({ 
                gender: 'male', 
                country: countryNames[
                    Utils.randomIntFromInterval(0, countryNames.length - 1)
                ]
            });
            const secondName = nameService().secondName();
            const birthday = Utils.randomBirthday(17, 32);
            const size = Utils.randomIntFromInterval(155, 205);

            const player = await playerService.create({
                firstName: firstName,
                secondName: secondName,
                birthday: birthday,
                height: size
            });

            team.addPlayer(player);
        }
    }
};