import express, { Router, Request, Response } from "express";
import User from "../models/user";
import crypto from "crypto";

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
    console.log(user);
    try {
      const newUser = await user.save();
      console.log(`user added successfully ${newUser}`);
      res.render("user/signin");
    } catch (error) {}
  };

  public static signinUser = async (req: Request, res: Response) => {
    const body = req.body;
    const { email, pwd } = req.body;
    console.log(req.body);
    try {
      const user: any = await User.findOne({ email: email });
      if (user) {
        const decPassword = this.decryptData(user.password);
        if (pwd === decPassword) {
          console.log("Valid User");
          res.redirect("/");
        } else {
          console.log("Invalid user");
          res.render("user/signin");
        }
      }
      console.log(`registered User ${user}`);
    } catch (error) {}
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
}

export default UserController;
