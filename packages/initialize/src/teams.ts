import { teamService } from "@football-manager/db-handler";
import { TeamInput } from "@football-manager/db-handler/src/models/team";
import { readFileSync } from "fs";

export const initTeams = async (resource: string) => {

    const raw = readFileSync(resource);
    const list:TeamInput[] = JSON.parse(raw.toString());
    
    for (const team of list) {
        await teamService.create(team);
    }
};