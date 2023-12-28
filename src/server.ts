import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose, { Connection } from "mongoose";
import { config } from "./config/config";
import indexRouter from "./routers/indexRoute";
import authorRouter from "./routers/authorRoute";
import genreRouter from "./routers/genreRoute";
import bookRouter from "./routers/bookRoute";
import magazineTypeRouter from "./routers/magazineTypeRoute";
import magazineRouter from "./routers/magazineRoute";
import userRouter from "./routers/userRoute";
import contactRouter from "./routers/contactRoute";
import expressEjsLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import verifyToken from "./middleware/verifyToken";
import methodOverride from "method-override";
import fileupload from "express-fileupload";
import ErrorHandler from "./middleware/errorHandler";
import log4js from "./middleware/logger";

dotenv.config();
const app: Express = express();
const logger = log4js.getLogger("file");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(express.static("src/public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(expressEjsLayouts);
app.use(methodOverride("_method"));
app.use(fileupload());
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/", verifyToken, indexRouter);
app.use("/author", verifyToken, authorRouter);
app.use("/genre", verifyToken, genreRouter);
app.use("/book", verifyToken, bookRouter);
app.use("/type", verifyToken, magazineTypeRouter);
app.use("/magazine", verifyToken, magazineRouter);
app.use("/contact", verifyToken, contactRouter);
app.all("*", ErrorHandler.handleUnknownUrl);
app.use(ErrorHandler.handleError);

const start = async () => {
  try {
    await mongoose.connect(config.mongo.url);
    logger.info("DB connected successfully");
    const db: Connection = mongoose.connection;
    db.on("error", (err) => {
      logger.error(err);
    });
    app.listen(config.server.port, (): void => {
      logger.info("Server is running");
    });
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

start();

