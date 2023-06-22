import { formationService } from "@football-manager/db-handler";
import { FormationCreationAttributes } from "@football-manager/db-handler/src/models/formation";
import { readFileSync } from "fs";

export const initFormations = async (resource: string) => {

    const raw = readFileSync(resource);
    const list : FormationCreationAttributes[] = JSON.parse(raw.toString());
    
    for (const formation of list) {
        await formationService.create(formation);
    }

};
