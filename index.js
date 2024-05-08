"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose_1 = require("mongoose");
// import * as cookieParser from 'cookie-parser'; 
var author_route_1 = require("./router/author.route");
var category_route_1 = require("./router/category.route");
var book_route_1 = require("./router/book.route");
var user_route_1 = require("./router/user.route");
var auth_middleware_1 = require("./middleware/auth.middleware");
var app = express();
var port = 3000;
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Routes
app.use('/author', author_route_1.default);
app.use('/category', category_route_1.default);
app.use('/book', auth_middleware_1.authenticateToken, book_route_1.default);
app.use('/user', user_route_1.default);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
// import { BookModel } from './model/book.model';
// // Assuming you have the ObjectId of the book document
// const bookId = '6638f5e56cc150af9a3e63cb';
// // Query the book document and populate the 'authorName' and 'categoryNames' fields
// BookModel.findById(bookId)
//     .populate('authorName', 'name')
//     .populate('categoryNames', 'name')
//     .exec()
//     .then((book) => {
//         console.log('Book:', book);
//     })
//     .catch((err) => {
//         console.error('Error:', err);
//     });
mongoose_1.default.connect('mongodb://localhost:27017/bookstore')
    .then(function () {
    console.log('connected to DB');
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
