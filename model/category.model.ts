import mongoose, { Schema, Document } from 'mongoose';

interface ICategory extends Document {
    name: string;
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true }
}, { timestamps: true });


const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);

export { CategoryModel, ICategory };
