import { readFileSync } from "fs";

import { playerService, teamService } from "@football-manager/db-handler";
import { TeamInput } from "@football-manager/db-handler/src/models/team";
import { nameService } from "@football-manager/names";
import config from "./config/config";

export const initTeams = async (resource: string) => {

    const raw = readFileSync(resource);
    const list : TeamInput[] = JSON.parse(raw.toString());
    
    for (const teamConfig of list) {
        const team = await teamService.create(teamConfig);

        for (let i=0; i<config.teams.initPlayerCount; i++) {
            const firstName = nameService().firstName();
            const secondName = nameService().secondName();
            
            const player = await playerService.create({
                firstName: firstName,
                secondName: secondName
            });

            team.addPlayer(player);
        }
    }
};