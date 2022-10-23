import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import { championshipService } from "@football-manager/db-handler"
import { FilterChampionShipDTO } from "@football-manager/data-transfer";

const championshipRouter = Router();

championshipRouter.get('/', asyncHandler( async (req: Request, res: Response) => {
    const filters:FilterChampionShipDTO = req.query;
    const result = await championshipService.getAll(filters);
    res.status(200).json(result);
}));

export default championshipRouter;