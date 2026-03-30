// External Modules
import express from "express";

// Local Modules
import { handleSearch } from "../controllers/func.controller.js";

const FuncRouter = express.Router();

// GET Requests Handling
FuncRouter.get("/search", handleSearch);

export default FuncRouter;
