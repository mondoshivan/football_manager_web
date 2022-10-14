import { Router } from 'express'

import clubRouter from './club'

const router = Router()

router.use('/club', clubRouter)

export default router