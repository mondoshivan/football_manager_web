import { userService } from "@football-manager/db-handler";
import { UserCreationAttributes } from "@football-manager/db-handler/src/models/user.model";
import { readFileSync } from "fs";

export const initUsers = async (resource: string) => {

    const raw = readFileSync(resource);
    const list : UserCreationAttributes[] = JSON.parse(raw.toString());
    
    for (const user of list) {
        await userService.create(user);
    }

};
