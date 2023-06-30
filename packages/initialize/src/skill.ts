import { skillService } from "@football-manager/db-handler";
import { SkillCreationAttribute } from "@football-manager/db-handler/src/models/skill.model";
import { readFileSync } from "fs";

export const initSkills = async (resource: string) => {

    const raw = readFileSync(resource);
    const list : SkillCreationAttribute[] = JSON.parse(raw.toString());
    
    for (const skill of list) {
        await skillService.create(skill);
    }

};
