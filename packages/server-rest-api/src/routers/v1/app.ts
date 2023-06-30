import { FilterAppDTO, GetByIdDTO, IncludesDTO } from "@football-manager/data-transfer";
import asyncHandler from "express-async-handler"
import { appService } from "@football-manager/db-handler";
import { Request, Response, Router } from "express";
import { jwtValidation } from "../../middlewares/jwt-validation";

const appRouter = Router();

appRouter.use(jwtValidation);

appRouter.get('/', asyncHandler( async (req: Request, res: Response) => {
    const filters : FilterAppDTO = req.query;
    const includes : IncludesDTO = req.query;
    const result = await appService.getAll(filters, includes);
    res.status(200).json(result);
}));

appRouter.get('/:id', asyncHandler( async (req: Request, res: Response) => {
    const query = req.params as GetByIdDTO;
    const includes : IncludesDTO = req.query;
    const result = await appService.getById(query.id!, includes);
    res.status(200).json(result);
}));

export default appRouter;
