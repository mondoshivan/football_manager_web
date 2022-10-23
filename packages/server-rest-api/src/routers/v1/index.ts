import { Router } from 'express'

import teamRouter from './team'
import championshipRouter from './championship'

const router = Router();

router.use('/teams', teamRouter);
router.use('/championships', championshipRouter)

export default router;