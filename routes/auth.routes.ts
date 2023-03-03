import { Router } from "express";
import { signup, login } from "../controllers/auth.controllers";

const authRouter: Router = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);

export { authRouter };