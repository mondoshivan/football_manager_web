import { playerService, teamService } from "@football-manager/db-handler";
import { PlayerInput } from "@football-manager/db-handler/src/models/player";
import { readFileSync } from "fs";

export const initPlayers = async (resource: string) => {

    const raw = readFileSync(resource);
    const list:PlayerInput[] = JSON.parse(raw.toString());
    
    for (const player of list) {

        const modelPlayer = await playerService.create(player);
        console.log(modelPlayer);
    }
};