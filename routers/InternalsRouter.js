// External Modules
import express from "express";

// Local Modules
import { checkHealth } from "../controllers/InternalsController.js";

const InternalsRouter = express.Router();

// GET Requests Handling
InternalsRouter.get("/health", checkHealth);

export default InternalsRouter;
