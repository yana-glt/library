import express, { Router, Request, Response } from "express";

class IndexController {
  public static getIndex = (req: any, res: Response) => {
    const user = req.user;
    res.render("index", { user: user });
  };
}

export default IndexController;
