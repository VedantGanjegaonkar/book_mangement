"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var category_controller_1 = require("../controler/category.controller");
var categoryController = new category_controller_1.CategoryController();
var router = (0, express_1.Router)();
router.post('/create', categoryController.createCategory);
exports.default = router;
