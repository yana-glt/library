import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  email: string,
  password: string,
  role: string,
};
export interface IUserModel extends IUser, Document {};

const userSchema: Schema = new Schema(
  {
    email: { type: String, required: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model<IUserModel>("User", userSchema);
