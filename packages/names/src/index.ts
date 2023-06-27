import { readFileSync } from "fs";
import path from "path";
import NameService, { FirstName, SecondName } from "./services/name-service";

export const nameService = () : NameService => {
    const firstNameJson = path.join(__dirname, '../../resources/first-names.json');
    const rawFirstNames = readFileSync(firstNameJson);
    const firstNameList : FirstName[] = JSON.parse(rawFirstNames.toString());

    const secondNameJson = path.join(__dirname, '../../resources/second-names.json');
    const rawSecondNames = readFileSync(secondNameJson);
    const secondNameList : SecondName[] = JSON.parse(rawSecondNames.toString());

    return new NameService(firstNameList, secondNameList);
};
