// External Modules
import express from "express";

// Local Modules
import FunctionalityController from "../controllers/func.controller.js";

const FuncRouter = express.Router();

// GET Requests Handling
FuncRouter.get("/search", FunctionalityController.handleSearch);

export default FuncRouter;
