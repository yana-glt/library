import express, { Request, Response, NextFunction } from "express";
import CustomError from "../middleware/customError";
import log4js from "./logger";

class ErrorHandler {
  public static handleError = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (!err) return next();
    const logger = log4js.getLogger("file");
    logger.error(err);
    res.render("error", { message: err.message, code: err.statusCode });
  };

  public static handleUnknownUrl = (req: Request, res: Response, next: NextFunction) => {
    const err: CustomError = new CustomError(404, `Can't find ${req.originalUrl} on the server!`);
    next(err);
  };
}

export default ErrorHandler;
