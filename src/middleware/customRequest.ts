import { Request } from "express";
import User from "../models/user";

interface CustomRequest extends Request {
    user?: InstanceType<typeof User>;
}
export default CustomRequest;
