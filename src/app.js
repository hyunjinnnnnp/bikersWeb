import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import photoRouter from "./routers/photoRouter";
import { localsMiddleware } from "./middlewares";
import "./passport";
import apiRouter from "./routers/apiRouter";

const app = express();

dotenv.config();

app.locals.env = process.env;
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "/")));
app.use(express.static(path.join(__dirname, "/src")));
app.use(express.static(path.join(__dirname, "static")));
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.photos, photoRouter);
app.use(routes.api, apiRouter);

export default app;
