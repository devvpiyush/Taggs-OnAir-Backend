// External Modules
import express from "express";

// Local Modules
import controller from "../controllers/search.controller.js";

const SearchRouter = express.Router();

// GET Requests Handling
SearchRouter.get("/accounts", controller.searchAccounts);

export default SearchRouter;
