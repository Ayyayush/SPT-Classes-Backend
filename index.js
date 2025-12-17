import dotenv from "dotenv";
dotenv.config();                                // 1️⃣ Load env first

import express from "express";
import cors from "cors";

import DBConnection from "./Database/database.js";

import adminRouter from "./Routers/adminRoutes.js";
import userRouter from "./Routers/userRoutes.js";
import authRouter from "./Routers/authRoutes.js";

const app = express();

// 2️⃣ CORS (frontend alag port pe hai)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// 3️⃣ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4️⃣ Database connection
DBConnection();


// 🔥 DEBUG
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/api/auth", authRouter);

// 6️⃣ Health check (optional but useful)
app.get("/", (req, res) => {
  res.send("SPT Classes Backend is running 🚀");
});

// 7️⃣ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening at the port " + PORT);
});
