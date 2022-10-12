import { Request, Response, Router } from "express";
import { CreateClubDTO } from "../../data-transfer-objects/v1/club.dto";

import { clubService } from "@football-manager/db-handler"

const clubRouter = Router();

clubRouter.get('/', async (req: Request, res: Response) => {
    res.status(200).json({ name: 'HSV' });
})

clubRouter.post('/', async (req: Request, res: Response) => {
    const payload:CreateClubDTO = req.body

    try {
        const result = await clubService.create(payload)
        return res.status(200).send(result)
    } catch (error) {
        res.status(500).send('failed')
    } 
})

export default clubRouter;