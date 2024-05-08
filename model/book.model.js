"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
var mongoose_1 = require("mongoose");
var BookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Author', required: true },
    category: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true }],
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
var BookModel = mongoose_1.default.model('Book', BookSchema);
exports.BookModel = BookModel;
