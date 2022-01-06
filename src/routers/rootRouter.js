import express from "express";
import { seeBooks } from "../controllers/bookController.js";

const rootRouter = express.Router();

rootRouter.get("/", seeBooks);

export default rootRouter;
