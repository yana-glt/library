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

dotenv.config();
const app: Express = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(express.static("src/public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(expressEjsLayouts);
app.use(express.json());
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/author", authorRouter);
app.use("/book", bookRouter);
app.use("/user", userRouter);

const start = async () => {
  try {
    await mongoose.connect(config.mongo.url);
    console.log("DB connected successfully");
    app.listen(config.server.port, (): void => {
      console.log("Server is running");
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
const db: Connection = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
