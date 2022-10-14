import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"

import { CreateClubDTO } from "../../data-transfer-objects/v1/club.dto";

import { clubService } from "@football-manager/db-handler"

const clubRouter = Router();

clubRouter.get('/', asyncHandler( async (req: Request, res: Response) => {
    const result = await clubService.getAll({});
    res.status(200).json(result);
}));

clubRouter.post('/', asyncHandler( async (req: Request, res: Response) => {
    const payload:CreateClubDTO = req.body;
    const result = await clubService.create(payload);
    res.status(200).send(result);
}));

export default clubRouter;