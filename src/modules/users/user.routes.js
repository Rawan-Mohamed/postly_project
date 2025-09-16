import express from 'express';
import { signup, signin } from './user.controller.js';
import { checkEmailExist } from '../../middleware/checkEmailExist.js';

let userRouter = express.Router();

userRouter.post("/signup", checkEmailExist, signup)
userRouter.post("/signin", signin)

export{
    userRouter
}