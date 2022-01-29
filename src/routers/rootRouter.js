import express from "express";
import { seeBooks } from "../controllers/bookController.js";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController";
import {
  getAddBook,
  postAddBook
} from "../controllers/bookController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares.js";

const rootRouter = express.Router();

rootRouter.get("/", seeBooks);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/logout", protectorMiddleware, logout);
rootRouter.route("/add").all(protectorMiddleware).get(getAddBook).post(postAddBook);

export default rootRouter;
