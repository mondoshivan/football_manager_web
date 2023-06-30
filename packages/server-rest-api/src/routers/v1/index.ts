import { Router } from 'express';

import appRouter from './app';
import authRouter from './auth';
import calendarRouter from './calendar';
import championshipRouter from './championship'
import formationRouter from './formation';
import playerRouter from './player';
import teamRouter from './team';

const router = Router();

router.use('/app', appRouter);
router.use('/auth', authRouter);
router.use('/calendars', calendarRouter);
router.use('/championships', championshipRouter);
router.use('/formations', formationRouter);
router.use('/players', playerRouter);
router.use('/teams', teamRouter);

export default router;