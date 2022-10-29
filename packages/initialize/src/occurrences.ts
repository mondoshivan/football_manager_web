import { occurrenceService } from "@football-manager/db-handler";
import { OccurrenceInput } from "@football-manager/db-handler/src/models/occurrence";
import { readFileSync } from "fs";

export const initOccurrences = async (resource: string) => {

    const raw = readFileSync(resource);
    const list : OccurrenceInput[] = JSON.parse(raw.toString());

    for (const event of list) {
        await occurrenceService.create(event);
    }
};