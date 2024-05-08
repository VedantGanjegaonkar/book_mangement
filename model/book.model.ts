import mongoose, { Schema, Document } from 'mongoose';
import { IAuthor } from './author.model';
import { ICategory } from './category.model';

interface IBook extends Document {
    title: string;
    author: IAuthor;
    category: ICategory[];
    ISBN: string;
    description: string;
    price: number;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
    ISBN: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
});

// Populate the 'author' field with the 'name' field from the 'Author' model
BookSchema.virtual('authorName', {
    ref: 'Author',
    localField: 'author',
    foreignField: '_id',
    justOne: true,
    autopopulate: true,
    select: 'name'
});

// Populate the 'category' field with the 'name' field from the 'Category' model
BookSchema.virtual('categoryNames', {
    ref: 'Category',
    localField: 'category',
    foreignField: '_id',
    justOne: false,
    autopopulate: true,
    select: 'name'
});
BookSchema.set('toObject', { virtuals: true });
BookSchema.set('toJSON', { virtuals: true });


const BookModel = mongoose.model<IBook>('Book', BookSchema);

export { BookModel, IBook };
