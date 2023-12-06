import express, { Router, Request, Response } from "express";
import User from "../models/user";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import log4js from "../middleware/logger";

const logger = log4js.getLogger("file");

class UserController {
  static key: any = process.env.key;
  static iv: any = process.env.iv;
  static algo: any = process.env.algo;
  public static register = (req: Request, res: Response) => {
    res.render("user/register");
  };

  public static signin = (req: Request, res: Response) => {
    res.render("user/signin");
  };

  public static registerUser = async (req: Request, res: Response) => {
    const body = req.body;
    const { email, pwd } = req.body;
    const password = this.encryptData(pwd);
    const user = new User({
      email,
      password,
    });
    logger.info(`New user was registred: ${user}`);
    const newUser = await user.save();
    logger.info(`New user was added to db successfully ${newUser}`);
    res.render("user/signin");
  };

  public static signInUser = async (req: Request, res: Response) => {
    const body = req.body;
    const { email, pwd } = req.body;
    const user: any = await User.findOne({ email: email });
    if (user) {
      const decPassword = this.decryptData(user.password);
      if (pwd === decPassword) {
        const accessToken = this.generateAccessToken(user);
        res.cookie("accessToken", accessToken, {
          maxAge: 900000,
          httpOnly: true,
        });
        res.redirect("/");
      } else {
        res.render("user/signin");
      }
    }
  };

  public static signOut = async (req: Request, res: Response) => {
    res.clearCookie("accessToken");
    res.render("user/signin");
  };

  static encryptData(data: string): any {
    const cipher = crypto.createCipheriv(this.algo, this.key, this.iv);
    let encrypted = cipher.update(data, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  }

  static decryptData(data: string): any {
    const decipher = crypto.createDecipheriv(this.algo, this.key, this.iv);
    let decrypted = decipher.update(data, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  static generateAccessToken(_user: any) {
    const key = process.env.secret_key || "";
    const { _id, email, role } = _user;
    const user: any = { _id, email, role };
    return jwt.sign({ user }, key, { expiresIn: "30s" });
  }
}

export default UserController;
