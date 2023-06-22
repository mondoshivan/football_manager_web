import { appService } from "@football-manager/db-handler";
import config from "./config/config";

export const initGame = async () => {   

    const start = new Date(config.game.initGameDay);

    await appService.create({ day: start, start: start});
};