import express from "express";
import {loginUser, registerStudent } from "../Controllers/authController.js";

console.log("🔥 authRoutes loaded");

const authRouter = express.Router();

authRouter.post("/registerStudent", registerStudent);
authRouter.post("/studentLogin", loginUser);

export default authRouter;
