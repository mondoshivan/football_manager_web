import { championshipService } from "@football-manager/db-handler";
import { ChampionshipInput } from "@football-manager/db-handler/src/models/championship";
import { readFileSync } from "fs";

export const initChampionships = async (resource: string) => {

    const raw = readFileSync(resource);
    const list : ChampionshipInput[] = JSON.parse(raw.toString());
    
    for (const championship of list) {
        const model = await championshipService.create(championship);
        
    }

};
