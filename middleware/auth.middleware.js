"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anyLogedIn = exports.adminOnly = void 0;
var jwt = require("jsonwebtoken");
function adminOnly(req, res, next) {
    var authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    var user = jwt.verify(authHeader, 'secret');
    if (!user) {
        res.status(403).json({ message: 'Forbidden' });
        return;
    }
    if (user.role !== 'admin') {
        res.status(403).json({ message: 'u are not a admin,only admin have the access to this endpoints' });
        return;
    }
    req.user = user;
    console.log(user);
    next();
}
exports.adminOnly = adminOnly;
function anyLogedIn(req, res, next) {
    var authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    var user = jwt.verify(authHeader, 'secret');
    if (!user) {
        res.status(403).json({ message: 'Forbidden' });
        return;
    }
    req.user = user;
    console.log(user);
    next();
}
exports.anyLogedIn = anyLogedIn;
