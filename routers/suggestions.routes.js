// External Modules
import express from "express";

// Local Modules
import controller from "../controllers/suggestions.controller.js";
import AuthCheck from "../utils/jwt_requirence.util.js";

const SuggestionsRouter = express.Router();

// GET Requests Handling
SuggestionsRouter.get("/foryou", AuthCheck.requireAuth, controller.suggests);

export default SuggestionsRouter;
