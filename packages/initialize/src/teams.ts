import { readFileSync } from "fs";

import { playerService, teamService, skillService, formationService } from "@football-manager/db-handler";
import { TeamCreationAttributes } from "@football-manager/db-handler/src/models/team.model";
import { nameService } from "@football-manager/names";
import { config } from "./config/config";
import { Utils } from "@football-manager/utils";
import { Country } from "@football-manager/names/src/services/name-service";

export const initTeams = async (resource: string) => {

    const raw = readFileSync(resource);
    const list : TeamCreationAttributes[] = JSON.parse(raw.toString());
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

        const defaultFormation = await formationService.getById(1);
        await team.$set('formation', defaultFormation);

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

            const skills = await skillService.getAll();

            await Promise.all( 
                skills.filter( skill => 
                    skill.required 
                ).map( skill => 
                    player.$add('skill', skill, {
                        through: { 
                            value: Utils.randomIntFromInterval(0, 100)
                        } 
                    })
                ) 
            );

            await team.$add('player', player);
        }
    }
};