// External Modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Load Enviornment Variables
dotenv.config();

// Local Modules
import initSocket from "./src/utils/socket.util.js";
import AuthRoutes from "./src/routers/auth.routes.js";
import PostRoutes from "./src/routers/post.routes.js";
import SearchRouter from "./src/routers/search.routes.js";
import UserRoutes from "./src/routers/user.routes.js";
import FollowRouter from "./src/routers/follow.routes.js";
import SuggestionsRouter from "./src/routers/suggestions.routes.js";

// Create 'Express' App
const app = express();
const server = http.createServer(app);

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
app.use("/api/auth", AuthRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/search", SearchRouter);
app.use("/api/user", UserRoutes);
app.use("/api/follow", FollowRouter);
app.use("/api/suggestions", SuggestionsRouter);

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

// Initializing Socket Connection
initSocket(server);

server.listen(PORT, () => {
  console.log(`✔  Server is Running at http://localhost:${PORT}`);
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("🚀 Connected to Taggs Database Successfully!"))
    .catch((err) => {
      console.log(err);
    });
});
