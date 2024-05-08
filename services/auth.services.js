"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getId = exports.setId = void 0;
// auth.services books 
var jwt = require("jsonwebtoken");
var secret = 'myvv';
function setId(user) {
    return jwt.sign({ _id: user._id, email: user.email }, secret);
}
exports.setId = setId;
function getId(token) {
    if (!token)
        return null;
    try {
        var decoded = jwt.verify(token, secret);
        return decoded._id;
    }
    catch (error) {
        return null;
    }
}
exports.getId = getId;
