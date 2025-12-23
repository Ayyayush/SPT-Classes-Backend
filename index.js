import "./config/env.js";

import express from "express";
import cors from "cors";

import DBConnection from "./Database/database.js";
import adminRouter from "./Routers/adminRoutes.js";
import userRouter from "./Routers/userRoutes.js";
import authRouter from "./Routers/authRoutes.js";
import contactRoutes from "./Routers/contactRoutes.js";

const app = express();

/* ================= CORS (FIXED) ================= */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://spt-classes.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

/* ================= BODY PARSERS ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= DATABASE ================= */
DBConnection();

/* ================= DEBUG MIDDLEWARE ================= */
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

/* ================= ROUTES ================= */
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api", contactRoutes);   // POST /api/contact

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("SPT Classes Backend is running 🚀");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening at the port " + PORT);
});
