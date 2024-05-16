import { Request, Response } from 'express';
import { BookModel } from '../model/book.model';
import { ObjectId } from 'mongodb';


export class BookController {
    public async createBook(req: Request, res: Response): Promise<void> {
        try {
            const { title, author, category, ISBN, description, price } = req.body;
            const newBook = await BookModel.create({
                title,
                author,
                category,
                ISBN,
                description,
                price
            });
            res.status(201).json({ message: 'Book created successfully', book: newBook });
        } catch (err : any) {
            res.status(500).json({ message: 'Failed to create book', error: err.message });
        }
    }
    public async deleteBook(req: Request, res: Response): Promise<void> {
        try {
            const bookId = req.params.id;
            const book = await BookModel.findById(bookId);
            if (!book) {
                res.status(404).json({ message: 'Book not found' });
                return;
            }
            await BookModel.deleteOne({ _id: bookId });
            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (err : any) {
            res.status(500).json({ message: 'Failed to delete book', error: err.message });
        }
    }

    public async updateBook(req: Request, res: Response): Promise<void> {
        try {
            const bookId = req.params.id;
            const { title, author, category, ISBN, description, price } = req.body;

            const updatedBook = await BookModel.findByIdAndUpdate(
                bookId,
                { title, author, category, ISBN, description, price },
                { new: true }
            );

            if (!updatedBook) {
                res.status(404).json({ message: 'Book not found' });
                return;
            }

            res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
        } catch (err : any) {
            res.status(500).json({ message: 'Failed to update book', error: err.message });
        }
    }
    public async getAllBooks(req: Request, res: Response): Promise<void> {
        try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const searchQuery : string = req.query.search as string;
        const category : any = req.query.category as string;
        const author : any = req.query.author as string;

        let query : any = {};
        if (searchQuery) {
            const authorIdRegex = /^[0-9a-fA-F]{24}$/; // Regex pattern for a valid ObjectId
            if (authorIdRegex.test(searchQuery)) {
                query = {
                    $or: [
                        { title: { $regex: new RegExp(searchQuery, 'i') } },
                        { author: new ObjectId(searchQuery) }
                    ]
                };
            } else {
                query = { title: { $regex: new RegExp(searchQuery, 'i') } };
            }
        }
        if (category) {
            query['category'] = new ObjectId(category);
        }
        if (author) {
            query['author'] = new ObjectId(author);
        }

        const books = await BookModel.find(query)
                                     .skip(skip)
                                     .limit(limit);

        res.status(200).json({ books });
        } catch (err : any) {
            res.status(500).json({ message: 'Failed to fetch books', error: err.message });
        }
    }
    
    public async getBookById(req: Request, res: Response): Promise<void> {
        try {
            const bookId = req.params.id;
            const book = await BookModel.findById(bookId);
            if (!book) {
                res.status(404).json({ message: 'Book not found' });
                return;
            }
            res.status(200).json({ book });
        } catch (err : any) {
            res.status(500).json({ message: 'Failed to fetch book', error: err.message });
        }
    }
}
