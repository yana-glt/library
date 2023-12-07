import mongoose ,{Document, Schema} from 'mongoose';

export interface IAuthor {
    name:string,
    books:mongoose.Schema.Types.ObjectId[],
};
export interface IAuthorModel extends IAuthor, Document {};

const authorSchema: Schema = new Schema(
    {
        name:{type:String, required:true},
        books:[{type: mongoose.Schema.Types.ObjectId,  ref:'Book'}],
    },
    {timestamps:true}
);

export default mongoose.model<IAuthorModel>('Author', authorSchema);