import express, { Request, Response, NextFunction } from "express";
import CustomError from "../middleware/customError";
import log4js from "./logger";

class ErrorHandler {
  public static handleError = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
    if (!err) return next();
    const logger = log4js.getLogger("file");
    if(!this.isTrustedError(err)) process.exit(1);
    logger.error(err);
    res.render("error", { message: err.message, code: (err as CustomError).statusCode });
  };

  public static handleUnknownUrl = (req: Request, res: Response, next: NextFunction) => {
    const err: CustomError = new CustomError(404, `Can't find ${req.originalUrl} on the server!`);
    next(err);
  };

  public static isTrustedError(err: any): boolean {
    if (err instanceof CustomError) {
      return err.isOperational;
    }
    return false;
  };
}

export default ErrorHandler;
