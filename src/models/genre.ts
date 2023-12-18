import mongoose, { Document, Schema } from "mongoose";

export interface IGenre {
  name: string,
  description: string,
  books:mongoose.Schema.Types.ObjectId[],
};
export interface IGenreModel extends IGenre, Document {};

const genreSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    books:[{type: mongoose.Schema.Types.ObjectId,  ref:'Book'}],
  }
);

export default mongoose.model<IGenreModel>("Genre", genreSchema);