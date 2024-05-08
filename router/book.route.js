"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var book_controler_1 = require("../controler/book.controler");
var categoryController = new book_controler_1.BookController();
var router = (0, express_1.Router)();
router.post('/create', categoryController.createBook);
router.delete('/delete/:id', categoryController.deleteBook);
router.put('/update/:id', categoryController.updateBook);
router.get('/', categoryController.getAllBooks);
router.get('/get/:id', categoryController.getBookById);
exports.default = router;
