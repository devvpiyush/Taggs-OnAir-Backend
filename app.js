// External Modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Local Modules
import InternalRoutes from "./routers/internals.routes.js";
import AuthRoutes from "./routers/auth.routes.js";

// Load Enviornments
dotenv.config();

// Create 'Express' App
const app = express();

// Configurations
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Constants
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Routing
app.use("/api/i", InternalRoutes);
app.use("/api/auth", AuthRoutes);

app.listen(PORT, () => {
  console.log(`✔  Server is Running at http://localhost:${PORT}!`);
  mongoose
    .connect(MONGO_URI)
    .then(console.log("🚀 Connected to Taggs Database Successfully!"))
    .catch((err) => {
      console.log(err);
    });
});
