import express, { Request, Response, NextFunction } from "express";
import CustomError from "../middleware/customError";

class ErrorHandler{
    public static handleError = (err:CustomError, req:Request, res:Response, next:NextFunction)=>{
        if(!err) return next();
        console.log("Error log:", err);
        res.render('error', {message:err.message, code:err.statusCode});
    }

    public static handleUnknownUrl = (req:Request, res:Response, next:NextFunction)=>{
        const err:CustomError = new CustomError(404, `Can't find ${req.originalUrl} on the server!`);
        next(err);
    }
}

export default ErrorHandler;