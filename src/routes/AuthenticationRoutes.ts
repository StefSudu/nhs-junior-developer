import { generateAccessToken } from '../controller/AuthController';

const authRouter = require('express').Router();

authRouter.post('/token', generateAccessToken);

export { authRouter };