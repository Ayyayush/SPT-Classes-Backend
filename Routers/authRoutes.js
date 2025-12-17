import express from "express";
import { registerUser, loginUser } from "../Controllers/authController.js";

console.log("🔥 authRoutes loaded");

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export default authRouter;
