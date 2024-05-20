// import { ObjectId } from 'mongoose';
import { ObjectId } from 'mongodb';

import { BookModel,IBook } from '../model/book.model';
import { IAuthor } from '../model/author.model';
import { ICategory } from '../model/category.model';
import { AppError, NotFoundError, ValidationError, UnauthorizedError } from '../utils/errors';

interface createBookParams{
    title: string;
    author: IAuthor;
    category: ICategory[];
    ISBN: string;
    description: string;
    price: number;
}
interface BookQueryParams {
    page: number;
    limit: number;
    searchQuery?: string;
    category?: string;
    author?: string;
}


export class bookServices{

    public async createBook(params:createBookParams): Promise<IBook> {
        
        const {title, author, category, ISBN, description, price } = params

        const newBook = await BookModel.create({
            title,
            author,
            category,
            ISBN,
            description,
            price
        });

        return newBook
    }
    

    
    public async findBookById(bookId: string): Promise<IBook>{

        const book = await BookModel.findOne({ bookId });
        if (!book) {
            throw new NotFoundError('book not found');
        }
        return book;
    }

    public async deleteBook(bookId: string):Promise<void> {

            const book = await BookModel.findById(bookId);

            if (!book) {
                throw new NotFoundError("book not found to delete")
            }
        await BookModel.deleteOne({ _id: bookId });
    }

    public async updateBook(bookId:string,params:any): Promise<IBook>{

        const {title, author, category, ISBN, description, price } = params

        
        const updatedBook = await BookModel.findByIdAndUpdate(
            bookId,
            { title, author, category, ISBN, description, price },
            { new: true }
        );

        if (!updatedBook) {
            throw new NotFoundError("book not found to update")
        }

        return updatedBook
    }

    // aggregation pipeline
 
public async getAllBooksService({ page, limit, searchQuery, category, author }: BookQueryParams) {
    const skip = (page - 1) * limit;

    const pipeline: any[] = [];

    if (searchQuery) {
        pipeline.push({
            $match: {
                title: { $regex: new RegExp(searchQuery, 'i') }
            }
        });
    }
    if (category) {
        pipeline.push({
            $match: {
                category: new ObjectId(category)
            }
        });
    }
    if (author) {
        pipeline.push({
            $match: {
                author: new ObjectId(author)
            }
        });
    }


    pipeline.push(
        { $skip: skip },
        { $limit: limit }
    );

    console.log(pipeline);
    
    const book =await BookModel.aggregate(pipeline).exec();

    // if(book.length==0){
    //     throw new NotFoundError("no such book")
    // }
    return book 
};


    public async findBookByAutherID(AuthorID: ObjectId): Promise<IBook[]> {

        const book = await BookModel.find({ author:AuthorID });
        if (!book) {
            throw new NotFoundError('book not found with this authorID');
        }
        return book;
    }


}