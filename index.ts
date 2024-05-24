import express from 'express';
import mongoose from 'mongoose';
// import * as cookieParser from 'cookie-parser'; 
import authorRoute from './router/author.route'
import categoryRoute from './router/category.route'
import bookRoute from './router/book.route'
import userRoute from './router/user.route'


import { adminOnly } from './middleware/auth.middleware';


const app = express()
const port = 3000


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//Routes
app.use('/author',adminOnly,authorRoute)
app.use('/category',adminOnly,categoryRoute)
app.use('/book',bookRoute)
app.use('/user',userRoute)



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






mongoose.connect('mongodb://localhost:27017/bookstore')
  .then(() => {
    console.log('connected to DB');
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})