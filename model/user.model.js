"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
// Define the user schema
var userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'author', 'customer'], required: true }
});
// Create the user model
var UserModel = (0, mongoose_1.model)('User', userSchema);
exports.UserModel = UserModel;
