import { championshipService } from "@football-manager/db-handler";
import { ChampionshipCreationAttributes } from "@football-manager/db-handler/src/models/championship.model.js";
import { readFileSync } from "fs";

export const initChampionships = async (resource: string) => {

    const raw = readFileSync(resource);
    const list : ChampionshipCreationAttributes[] = JSON.parse(raw.toString());
    
    for (const championship of list) {
        const model = await championshipService.create(championship);
        
    }

};
