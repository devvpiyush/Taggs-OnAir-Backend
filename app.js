// External Modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Load Enviornment Variables
dotenv.config();

// Local Modules
import InternalRoutes from "./routers/internals.routes.js";

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

app.use((err, req, res, next) => {
  // Default values
  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_SERVER_ERROR";
  const message = err.message || "Something went wrong";
  const meta = err.meta || null;

  // Build response object
  const response = {
    isSuccess: false,
    code,
    message,
  };

  // Attach meta only if exists
  if (meta) response.meta = meta;

  res.status(statusCode).json(response);
});

app.listen(PORT, () => {
  console.log(`✔  Server is Running at http://localhost:${PORT}`);
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("🚀 Connected to Taggs Database Successfully!"))
    .catch((err) => {
      console.log(err);
    });
});
