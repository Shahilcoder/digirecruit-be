import { Router } from "express";
import { signup } from "../controllers/auth.controllers";

const authRouter: Router = Router();

authRouter.post('/signup', signup);

export { authRouter };