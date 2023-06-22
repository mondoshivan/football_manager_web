import { championshipService, teamService } from "@football-manager/db-handler";
import { ChampionshipCreationAttributes } from "@football-manager/db-handler/src/models/championship";
import { readFileSync } from "fs";

export const initChampionchipTeams = async (resource: string) => {

    const raw = readFileSync(resource);
    const list : any = JSON.parse(raw.toString());
    
    for (const association of list) {
        const championshipName = association.championship.name;
        const [championship] = await championshipService.getByName(championshipName);

        for (const teamConfig of association.teams) {
            const [team] = await teamService.getByName(teamConfig.name);
            team.addChampionship(championship);
        }
    }

};
