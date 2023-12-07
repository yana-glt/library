import express, { Router, Request, Response } from "express";
import User from "../models/user";
import crypto from "crypto";
import jwt from 'jsonwebtoken';

class UserController {
  static key: string  = process.env.key || '';
  static iv: string  = process.env.iv || '';
  static algo: string  = process.env.algo || '';

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
    } catch (error) {
      console.log(error);
    }
  }

  public static signInUser = async (req: Request, res: Response) => {
    const body = req.body;
    const { email, pwd } = req.body;
    console.log(req.body);
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const decPassword = this.decryptData(user.password);
        if (pwd === decPassword) {
          console.log("Valid User");
          const accessToken = this.generateAccessToken(user.id, user.email, user.role);
          console.log(accessToken);
          res.cookie('accessToken', accessToken, {maxAge:900000, httpOnly:true});
          res.redirect("/");
        } else {
          console.log("Invalid user");
          res.render("user/signin");
        }
      }
      console.log(`registered User ${user}`);
    } catch (error) {
      console.log(error);
    }
  }

  public static signOut = async (req: Request, res: Response) => {
    try {
      res.clearCookie('accessToken');
      res.render('user/signin');
    } catch (error) {
      console.log(error);
    }
  }

  static encryptData(data: string): string {
    const cipher = crypto.createCipheriv(this.algo, this.key, this.iv);
    let encrypted = cipher.update(data, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  }

  static decryptData(data: string): string {
    const decipher = crypto.createDecipheriv(this.algo, this.key, this.iv);
    let decrypted = decipher.update(data, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  static generateAccessToken(id:string, email:string, role:string){
    const key: string = process.env.secret_key || '';
    const user = {id, email, role};
    return jwt.sign({user}, key, {expiresIn:'30s'});
  }
}

export default UserController;
