import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CustomRequest from "../middleware/customRequest";

function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
  const accessToken = req.cookies.accessToken;
  const key = process.env.secret_key || "";
  jwt.verify(accessToken, key, (err: any, data: any) => {
    if (err) {
      err.statusCode = 403;
      next(err);
    } else if (data.user) {
      req.user = data.user;
      next();
    }
  });
}

export default verifyToken;
