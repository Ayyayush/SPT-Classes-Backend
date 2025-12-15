import express from "express";
import { addStudentInfo } from "../Controllers/adminControllers.js";

const adminRouter = express.Router();
adminRouter.post("/addStudentInfo",(req,res)=>addStudentInfo(req,res));

export default adminRouter;

