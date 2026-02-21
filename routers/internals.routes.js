// External Modules
import express from "express";

// Local Modules
import { checkHealth } from "../controllers/internals.controller.js";

const InternalsRouter = express.Router();

// GET Routes
InternalsRouter.get("/health", checkHealth);

export default InternalsRouter;
