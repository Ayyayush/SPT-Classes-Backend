import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DBConnection  from "./Database/database.js";
import adminRouter from "./Routers/adminRoutes.js";

dotenv.config();
const app=express();

//// as frontend is running on the different platform
app.use(cors({ 
    origin: "http://localhost:3000", 
    credentials: true 
}));



//// establishing the connection to the database
DBConnection();

// middleware to parse JSON
app.use(express.json());

//// this is required for the application like postman
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/admin", adminRouter);


app.listen(process.env.PORT,()=>{
    console.log("Server listening at the port "+process.env.PORT)
})
