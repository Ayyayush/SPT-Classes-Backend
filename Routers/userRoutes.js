import express from "express";
import { addDataInSheet } from "../Controllers/sheetController.js";
import { registerStudent } from "../Controllers/userController.js";

const userRouter = express.Router();
userRouter.post("/addDataInSheet",(req,res)=>addDataInSheet(req,res));
userRouter.post("/registerStudent",(req,res)=>registerStudent(req,res))

export default userRouter;

