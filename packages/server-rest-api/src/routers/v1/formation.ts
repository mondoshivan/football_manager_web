import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import { formationService } from "@football-manager/db-handler"
import { CreateFormationDTO, FilterFormationDTO } from "@football-manager/data-transfer";

const formationRouter = Router();

formationRouter.get('/', asyncHandler( async (req: Request, res: Response) => {
    const filters:FilterFormationDTO = req.query;
    const result = await formationService.getAll(filters);
    res.status(200).json(result);
}));

export default formationRouter;