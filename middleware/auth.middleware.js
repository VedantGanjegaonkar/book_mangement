"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
var jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
    var authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    jwt.verify(authHeader, 'secret', function (err, user) {
        if (err) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        }
        req.user = user;
        next();
    });
}
exports.authenticateToken = authenticateToken;
