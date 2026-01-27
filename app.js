// External Modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Local Modules
import InternalsRouter from "./routers/InternalsRouter.js";

// Load Enviornments
dotenv.config();

// Create 'Express' App
const app = express();

// Configurations
app.use(
  cors({
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());

// Constants
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Routing
app.use("/api/i", InternalsRouter);

app.listen(PORT, () => {
  console.log("✔  Server is Running Successfully!");
  mongoose
    .connect(MONGO_URI)
    .then(console.log("🚀 Connected to Taggs Database Successfully!"))
    .catch((err) => {
      console.log(err);
    });
});
