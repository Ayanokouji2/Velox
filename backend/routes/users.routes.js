import { Router } from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/users.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter
    .route("/register")
    .post(registerUser)

userRouter
    .route("/login")
    .post(loginUser)

userRouter
    .route("/profile")
    .get(authenticateUser, getUserProfile)

export default userRouter;