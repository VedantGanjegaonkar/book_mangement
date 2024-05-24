import { Request, Response,NextFunction } from 'express';
import { BookModel } from '../model/book.model';
import { ObjectId } from 'mongodb';
import{bookServices} from '../services/book.services'
import{errorHandler} from "../middleware/errorHandler"
import PDFDocument, { currentLineHeight } from 'pdfkit';
import fs from 'fs';
import path from 'path';
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

            const params:any={ page, limit, searchQuery, category, author }

            const result = await this.bookservice.getAllBooksService(params);
            console.log(result);
            


            let html = `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table>
        <thead>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>CategoryName</th>
            <th>AuthorName</th>
        </thead>
        <tbody>
        <td>Title</td>
        <td>Description</td>
        <td>Price</td>
        <td>CategoryName</td>
        <td>AuthorName</td>
        </tbody>
    </table>
</body>
</html>`

    //         //pdf print try 

            
    // // Create a PDF document
    // const doc = new PDFDocument();
    // const filename = `books_page_${page}.pdf`;
    // const filepath = path.join(__dirname, 'pdfs', filename);

    // // Write the PDF to a file
    // doc.pipe(fs.createWriteStream(filepath));


    // // Add some content to the PDF
    // doc.fontSize(20).text('Books List', { align: 'center' });
    // doc.fontSize(12).text(`Page ${page} of ${"totalPages"}`, { align: 'right' });
    // doc.moveDown();

    // result.forEach(book => {
    //   doc.fontSize(14).text(book.title, { underline: true });
    //   doc.fontSize(12).text(`Price: $${book.price}`);
    //   doc.fontSize(12).text(`Categories: ${book.categoryName}`);
    //   doc.fontSize(12).text(`Author: ${book.authorName}`);
    //   doc.moveDown();
    // });

    // // Finalize the PDF and end the stream
    // doc.end();

    // doc.on('finish', () => {
    //     res.download(filepath, filename, (err) => {
    //       if (err) {
    //         console.error('Error sending file:', err);
    //         res.status(500).send('Error sending file');
    //       } else {
    //         // Optionally delete the file after sending
    //         fs.unlink(filepath, (unlinkErr) => {
    //           if (unlinkErr) {
    //             console.error('Error deleting file:', unlinkErr);
    //           }
    //         });
    //       }
    //     });
    //   });



            
          
            res.status(200).json({ result });
        } catch (err: any) {
            errorHandler(err,req,res,next)
        }
    }
    
    
}
