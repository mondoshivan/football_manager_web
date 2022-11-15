import { Router } from 'express';

import authRouter from './auth';
import championshipRouter from './championship'
import formationRouter from './formation';
import playerRouter from './player';
import teamRouter from './team';

const router = Router();

router.use('/auth', authRouter);
router.use('/championships', championshipRouter);
router.use('/formations', formationRouter);
router.use('/players', playerRouter);
router.use('/teams', teamRouter);

export default router;