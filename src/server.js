import "./env.js";
import app from "./init.js";
import "./db.js";
import express from "express";
import morgan from "morgan";

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
