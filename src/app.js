
import express from "express";
import morgan from "morgan";
import session from "express-session";
import mongoStore from "connect-mongo";
import rootRouter from "./routers/rootrouter";
import videoRouter from "./routers/videorouter";
import userRouter from "./routers/userrouter";
import {localsMiddleware} from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));



app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: mongoStore.create({mongoUrl: process.env.DB_URL }),
    })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;