import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose, { Connection } from "mongoose";
import { config } from "./config/config";
import indexRouter from "./routers/indexRoute";
import authorRouter from "./routers/authorRoute";
import bookRouter from "./routers/bookRoute";
import userRouter from "./routers/userRoute";
import expressEjsLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import verifyToken from "./middleware/verifyToken";
import methodOverride from 'method-override';
import fileupload from 'express-fileupload';

dotenv.config();
const app: Express = express();

mongoose.connect(config.mongo.url);
const db: Connection = mongoose.connection;
db.on("error", (err: string) => {
  console.log(err);
});
db.once("open", (): void => {
  console.log("DB connected successfully");
  start();
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(express.static("src/public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(expressEjsLayouts);
app.use(methodOverride('_method'));
app.use(fileupload());
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/", verifyToken, indexRouter);
app.use("/author", verifyToken, authorRouter);
app.use("/book", verifyToken, bookRouter);

const start = (): void => {
  app.listen(config.server.port, (): void => {
    console.log("Server is running");
  });
};
