import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import { formationService, teamService } from "@football-manager/db-handler"

import { FilterTeamsDTO, GetByIdDTO, IncludesDTO, UpdateTeamFormationDTO } from "@football-manager/data-transfer";

const teamRouter = Router();

teamRouter.get('/', asyncHandler( async (req: Request, res: Response) => {
    const filters : FilterTeamsDTO = req.query;
    const includes : IncludesDTO = req.query;
    const result = await teamService.getAll(filters, includes);
    res.status(200).json(result);
}));

teamRouter.get('/:id', asyncHandler( async (req: Request, res: Response) => {
    const query = req.params as GetByIdDTO;
    const includes : IncludesDTO = req.query;
    const result = await teamService.getById(query.id!, includes);
    res.status(200).json(result);
}));

teamRouter.post('/formation', asyncHandler( async (req: Request, res: Response) => {
    const payload:UpdateTeamFormationDTO = req.body;
    const team = await teamService.getById(payload.teamId, { includeByName: 'Formation' });
    const [formation] = await formationService.getByName(payload.formation);
    await team.setFormation(formation);
    await team.reload();
    res.status(200).send(team);
}));

export default teamRouter;