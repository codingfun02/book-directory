import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import rootRouter from "./routers/rootRouter.js";
import bookRouter from "./routers/bookRouter.js";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
  })
);
app.use(flash());
app.use("/", rootRouter);
app.use("/books", bookRouter);
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found 404" });
});

export default app;
