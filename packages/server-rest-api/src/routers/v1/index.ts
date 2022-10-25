import { Router } from 'express';

import teamRouter from './team';
import championshipRouter from './championship'
import formationRouter from './formation';

const router = Router();

router.use('/teams', teamRouter);
router.use('/championships', championshipRouter);
router.use('/formations', formationRouter);

export default router;