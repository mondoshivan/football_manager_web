import { championshipService, teamService } from "@football-manager/db-handler";
import { readFileSync } from "fs";

export const initChampionchipTeams = async (resource: string) => {

    const raw = readFileSync(resource);
    const list : any = JSON.parse(raw.toString());
    
    for (const association of list) {
        const championshipName = association.championship.name;
        const [championship] = await championshipService.getAll({ name: championshipName });

        for (const teamConfig of association.teams) {
            const [team] = await teamService.getAll({ name: teamConfig.name });
            team.$add('championship', championship);
        }
    }

};
