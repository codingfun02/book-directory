import express from "express";
import {
  seeBook,
  getAddBook,
  postAddBook,
  getEditBook,
  postEditBook,
  deleteBook,
} from "../controllers/bookController";

const bookRouter = express.Router();

bookRouter.get("/:id([0-9a-f]{24})", seeBook);
bookRouter.route("/add").get(getAddBook).post(postAddBook);
bookRouter.route("/:id([0-9a-f]{24})/edit").get(getEditBook).post(postEditBook);
bookRouter.get("/:id([0-9a-f]{24})/delete", deleteBook);

export default bookRouter;
