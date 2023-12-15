import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CustomRequest from "../middleware/customRequest";
import CustomError from "../middleware/customError";

function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
  const accessToken = req.cookies.accessToken;
  const key = process.env.secret_key || "";
  jwt.verify(accessToken, key, (err: any, data: any) => {
    if (err) {
      next(new CustomError(403, "TokenExpiredError: jwt expired"));
    } else if (data.user) {
      req.user = data.user;
      next();
    }
  });
}

export default verifyToken;
