import express from "express";
import { addDataInSheet } from "../Controllers/sheetController.js";

const userRouter = express.Router();
userRouter.post("/addDataInSheet",(req,res)=>addDataInSheet(req,res));

export default userRouter;

