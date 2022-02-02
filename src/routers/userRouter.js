import express from "express";
import { seeUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id([0-9a-f]{24})", seeUser);

export default userRouter;