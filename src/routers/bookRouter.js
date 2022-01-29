import express from "express";
import {
  seeBook,
  getEditBook,
  postEditBook,
  deleteBook,
} from "../controllers/bookController";
import { protectorMiddleware } from "../middlewares";

const bookRouter = express.Router();

bookRouter.get("/:id([0-9a-f]{24})", seeBook);
bookRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEditBook).post(postEditBook);
bookRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, deleteBook);

export default bookRouter;
