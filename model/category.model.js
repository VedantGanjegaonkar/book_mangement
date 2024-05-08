"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
var mongoose_1 = require("mongoose");
var CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true }
}, { timestamps: true });
var CategoryModel = mongoose_1.default.model('Category', CategorySchema);
exports.CategoryModel = CategoryModel;
