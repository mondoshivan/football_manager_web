import { Includeable } from "sequelize";
import sequelizeConnection from "../config";
import { IncludesFilters } from "./types";

export const getIncludes = (includes?: IncludesFilters) : Includeable | undefined => {
    if (includes?.includeByName) return sequelizeConnection.model(includes.includeByName);
    if (includes?.includeNested) return { all: true, nested: true};
    if (includes?.includeAll) return { all: true};

    return;
}