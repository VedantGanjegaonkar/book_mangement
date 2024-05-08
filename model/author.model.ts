// author.model.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IAuthor extends Document {
    name: string;
    biography: string;
    nationality: string;
}

const AuthorSchema: Schema = new Schema(
    {
    name: { type: String, required: true },
    biography: { type: String, required: true },
    nationality: { type: String, required: true }
    },
    {
        timestamps:true
    }
);

const AuthorModel = mongoose.model<IAuthor>('Author', AuthorSchema);

export { AuthorModel, IAuthor };
