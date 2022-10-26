import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import { formationService } from "@football-manager/db-handler"
import { CreateFormationDTO, FilterFormationDTO, IncludesDTO } from "@football-manager/data-transfer";

const formationRouter = Router();

formationRouter.get('/', asyncHandler( async (req: Request, res: Response) => {
    const filters : FilterFormationDTO = req.query;
    const includes : IncludesDTO = req.query;
    const result = await formationService.getAll(filters, includes);
    res.status(200).json(result);
}));

export default formationRouter;