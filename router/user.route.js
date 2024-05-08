"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controler/user.controller");
var auth_middleware_1 = require("../middleware/auth.middleware");
var userController = new user_controller_1.UserController();
var router = (0, express_1.Router)();
router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.get('/protected', auth_middleware_1.authenticateToken, function (req, res) {
    res.status(200).json({ message: 'Protected route', user: req.user.role });
});
exports.default = router;
