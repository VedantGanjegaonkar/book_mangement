import { Request, Response,NextFunction } from 'express';
import { BookModel } from '../model/book.model';
import { ObjectId } from 'mongodb';
import{bookServices} from '../services/book.services'
import{errorHandler} from "../middleware/errorHandler"

export class BookController {

    private bookservice:bookServices;

    constructor(){
        this.bookservice=new bookServices()

        this.createBook=this.createBook.bind(this)
        this.deleteBook=this.deleteBook.bind(this)
        this.updateBook=this.updateBook.bind(this)
        this.getAllBooks=this.getAllBooks.bind(this)
    }

    public async createBook(req: Request, res: Response, next:NextFunction): Promise<void> {
        try {
            const { title, author, category, ISBN, description, price } = req.body;
            const params= {title, author, category, ISBN, description, price }

            const newBook=await this.bookservice.createBook(params)
            
            res.status(201).json({ message: 'Book created successfully', book: newBook });
        } catch (err : any) {
            errorHandler(err,req,res,next)
           
        }
    }
    public async deleteBook(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const bookId = req.params.id;

            await this.bookservice.deleteBook(bookId)


            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (err : any) {
            errorHandler(err,req,res,next)
        }
    }

    public async updateBook(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const bookId = req.params.id;
            const { title, author, category, ISBN, description, price } = req.body;
            const params= {title, author, category, ISBN, description, price }

            const updatedBook=await this.bookservice.updateBook(bookId,params)

            res.status(200).json({ message: 'Book updated successfully', book: updatedBook });

        } catch (err : any) {
            errorHandler(err,req,res,next)
            
        }
    }
    public async getAllBooks(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const searchQuery: string = req.query.search as string;
            const category: any = req.query.category as string;
            const author: any = req.query.author as string;

            const books = await this.bookservice.getAllBooksService({ page, limit, searchQuery, category, author });
            
          
            res.status(200).json({ books });
        } catch (err: any) {
            errorHandler(err,req,res,next)
        }
    }
    
    
}
