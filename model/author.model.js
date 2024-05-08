"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorModel = void 0;
// author.model.ts
var mongoose_1 = require("mongoose");
var AuthorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    biography: { type: String, required: true },
    nationality: { type: String, required: true }
}, {
    timestamps: true
});
var AuthorModel = mongoose_1.default.model('Author', AuthorSchema);
exports.AuthorModel = AuthorModel;
