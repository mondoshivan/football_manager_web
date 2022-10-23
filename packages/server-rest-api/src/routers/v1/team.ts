import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import { teamService } from "@football-manager/db-handler"

import { CreateTeamDTO, FilterTeamsDTO } from "../../data-transfer-objects/v1/team.dto";

const teamRouter = Router();

teamRouter.get('/', asyncHandler( async (req: Request, res: Response) => {
    const filters:FilterTeamsDTO = req.query;
    const result = await teamService.getAll(filters);
    res.status(200).json(result);
}));

teamRouter.post('/', asyncHandler( async (req: Request, res: Response) => {
    const payload:CreateTeamDTO = req.body;
    const result = await teamService.create(payload);
    res.status(200).send(result);
}));

export default teamRouter;