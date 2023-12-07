import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose, { Connection } from "mongoose";
import { config } from "./config/config";
import indexRouter from "./routers/indexRoute";
import authorRouter from "./routers/authorRoute";
import bookRouter from "./routers/bookRoute";

dotenv.config();
const app: Express = express();

const start = async () => {
  try {
    await mongoose.connect(config.mongo.url);
    console.log("DB connected successfully");
    app.listen(config.server.port, (): void => {
      console.log("Server is running");
    });
  } catch (err: any) {
    console.log(err);
    process.exit(1);
  }
};
start();
const db: Connection = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});

app.use("/", indexRouter);
app.use("/author", authorRouter);
app.use("/book", bookRouter);