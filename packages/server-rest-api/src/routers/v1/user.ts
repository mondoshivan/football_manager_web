import { NextFunction, Request, Response, Router } from "express";
import asyncHandler from "express-async-handler"
import passport from "passport";
import log from "@football-manager/log";
import { IncludesDTO, UserDTO } from "@football-manager/data-transfer";
import { userService } from "@football-manager/db-handler";
import AppHelper from "../../helpers/app";
import { jwtValidation } from "../../middlewares/jwt-validation";

const userRouter = Router();

userRouter.use(jwtValidation);

userRouter.get('/', asyncHandler( async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        const filters : UserDTO = req.query;
        const includes : IncludesDTO = req.query;
        const result = await userService.getAll(filters, includes);
        res.status(200).json(result);
      } else {
        res.redirect('/')
      }
}));

userRouter.post('/login', asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err, user, info) => {
        if (info) return res.send(info.message);
        if (err) return next(err);
        if (!user) return res.redirect('/login');

        req.login(user, (err) => {
          if (err) { return next(err); }
          return res.redirect('/');
        });

      })(req, res, next);
}));

export default userRouter;