import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import { calendarService } from "@football-manager/db-handler"

import { jwtValidation } from "../../middlewares/jwt-validation.js";

const calendarRouter = Router();

calendarRouter.use(jwtValidation);

export default calendarRouter;