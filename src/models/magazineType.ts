import mongoose, { Document, Schema } from "mongoose";

export interface IMagazineType {
  name: string,
  description: string,
  magazines: mongoose.Schema.Types.ObjectId[],
};
export interface IMagazineTypeModel extends IMagazineType, Document {};

const magazineTypeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    magazines:[{type: mongoose.Schema.Types.ObjectId,  ref:'Magazine'}],
  }
);

export default mongoose.model<IMagazineTypeModel>("MagazineType", magazineTypeSchema);