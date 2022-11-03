import { userService } from "@football-manager/db-handler";
import { UserInput } from "@football-manager/db-handler/src/models/user";
import { readFileSync } from "fs";

export const initUsers = async (resource: string) => {

    const raw = readFileSync(resource);
    const list : UserInput[] = JSON.parse(raw.toString());
    
    for (const user of list) {
        await userService.create(user);
    }

};
