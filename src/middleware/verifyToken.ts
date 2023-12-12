import express ,{Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import CustomRequest from '../middleware/customRequest';

function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const accessToken = req.cookies.accessToken;
    const key = process.env.secret_key || "";
    jwt.verify(accessToken, key, (err:any, data:any) => {
      if (err) {
        res.sendStatus(403);
      } else if (data.user) {
        req.user = data.user;
        next();
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export default verifyToken;
