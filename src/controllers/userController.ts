import express ,{Router, Request, Response} from 'express';

class UserController {
    public static register = (req:Request, res:Response) => {
        res.render('user/register');
    } 
    public static signin = (req:Request, res:Response) => {
        res.render('user/signin');
    } 
}

export default UserController;