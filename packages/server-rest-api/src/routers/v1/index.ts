import { Router } from 'express';

import appRouter from './app.js';
import authRouter from './auth.js';
import calendarRouter from './calendar.js';
import championshipRouter from './championship.js'
import formationRouter from './formation.js';
import playerRouter from './player.js';
import teamRouter from './team.js';

const router = Router();

router.use('/app', appRouter);
router.use('/auth', authRouter);
router.use('/calendars', calendarRouter);
router.use('/championships', championshipRouter);
router.use('/formations', formationRouter);
router.use('/players', playerRouter);
router.use('/teams', teamRouter);

export default router;