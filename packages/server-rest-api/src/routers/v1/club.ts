import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import { clubService } from "@football-manager/db-handler"

import { CreateClubDTO, FilterClubsDTO } from "../../data-transfer-objects/v1/club.dto";

const clubRouter = Router();

clubRouter.get('/', asyncHandler( async (req: Request, res: Response) => {
    const filters:FilterClubsDTO = req.query;
    const result = await clubService.getAll(filters);
    res.status(200).json(result);
}));

clubRouter.post('/', asyncHandler( async (req: Request, res: Response) => {
    const payload:CreateClubDTO = req.body;
    const result = await clubService.create(payload);
    res.status(200).send(result);
}));

export default clubRouter;