import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import { playerService } from "@football-manager/db-handler"

import { FilterPlayerDTO, GetByIdDTO, IncludesDTO } from "@football-manager/data-transfer";
import { jwtValidation } from "../../middlewares/jwt-validation.js";

const playerRouter = Router();

playerRouter.use(jwtValidation);

playerRouter.get('/', asyncHandler( async (req: Request, res: Response) => {
    const filters : FilterPlayerDTO = req.query;
    const includes : IncludesDTO = req.query;
    const result = await playerService.getAll(filters, includes);
    res.status(200).json(result);
}));

playerRouter.get('/:id', asyncHandler( async (req: Request, res: Response) => {
    const query = req.params as GetByIdDTO;
    const includes : IncludesDTO = req.query;
    const result = await playerService.getById(query.id!, includes);
    res.status(200).json(result);
}));

export default playerRouter;