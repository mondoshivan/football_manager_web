import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import { championshipService } from "@football-manager/db-handler"
import { FilterChampionShipDTO, GetByIdDTO, IncludesDTO } from "@football-manager/data-transfer";
import log from "@football-manager/log";
import { jwtValidation } from "../../middlewares/jwt-validation.js";

const championshipRouter = Router();

championshipRouter.use(jwtValidation);

championshipRouter.get('/', asyncHandler( async (req: Request, res: Response) => {
    const filters : FilterChampionShipDTO = req.query;
    const includes : IncludesDTO = req.query;
    const result = await championshipService.getAll(filters, includes);
    res.status(200).json(result);
}));

championshipRouter.get('/:id', asyncHandler( async (req: Request, res: Response) => {
    const query = req.params as GetByIdDTO;
    const includes : IncludesDTO = req.query;
    const result = await championshipService.getById(query.id!, includes);
    res.status(200).json(result);
}));

export default championshipRouter;