import { skillService } from "@football-manager/db-handler";
import { SkillInput } from "@football-manager/db-handler/src/models/skill";
import { readFileSync } from "fs";

export const initSkills = async (resource: string) => {

    const raw = readFileSync(resource);
    const list : SkillInput[] = JSON.parse(raw.toString());
    
    for (const skill of list) {
        await skillService.create(skill);
    }

};
