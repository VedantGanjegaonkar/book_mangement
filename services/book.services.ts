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
 
public async getAllBooksService(params: BookQueryParams) {
    const skip = (params.page - 1) * params.limit;

    const pipeline: any[] = [];

    pipeline.push({
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails"
        }
      },
      
       {
         $lookup: {
           from: "authors",
           localField: "author",
           foreignField: "_id",
           as: "authorDetails"
         }
       },
       {
        $unwind: {
          path: "$authorDetails",
          preserveNullAndEmptyArrays: true
        }
      },
       {
         $project: {
           title:1,
           price:1,
           description:1,
           "categoryName":"$categoryDetails.name",
           "authorName":"$authorDetails.name"
         }
       },
    )

    const searchFields=[
        "title",
        "categoryName",
        "description",
        "authorName"
    ]

    let searchFilter: any = [];
    let cateroryArray: any[] = [];
    

    if (params.searchQuery) {
        searchFilter = searchFields.map((field) => ({
            [field]: {
              $regex: params.searchQuery,
              $options: 'i',
            },
          }));

          console.log("this is search array : ",searchFilter);
          
        // pipeline.push({
        //     $match: {
        //         "$or":searchFilter               
        //     }
        // });
    }
//trying to make filter query

    const filterQuery={
        $match:{
            ...(searchFilter.length>0 && { $or: searchFilter })
           
        }
    }
    console.log("this is filter query :",filterQuery);
    // { '$match': { '$or': [ [Object], [Object], [Object], [Object] ] } }
    
   pipeline.push(filterQuery)

    if (params.category) {

       cateroryArray.push(params.category)
       console.log(cateroryArray);
       
        pipeline.push({
            $match: {
                categoryName: { $in: cateroryArray }
                // category: new ObjectId(category)
            }
        });
    }
    if (params.author) {
        pipeline.push({
            $match: {
                authorName:params.author
                // author: new ObjectId(author)
            }
        });
    }
    const book1 =await BookModel.aggregate(pipeline).exec();

    pipeline.push(
        { $skip: skip },
        { $limit: params.limit }
    );

    // console.log(pipeline);
    
    const book =await BookModel.aggregate(pipeline).exec();

    const totalBooks= book1.length
    const totalPages = Math.ceil(totalBooks / params.limit);
    const currentPage = params.page

    // console.log("total books :", totalBooks);
    // console.log("total pages :", totalPages);
    // console.log("currentPage :", currentPage);
    
    return {
        book,
      totalPages,
      currentPage

    }

   
};


    public async findBookByAutherID(AuthorID: ObjectId): Promise<IBook[]> {

        const book = await BookModel.find({ author:AuthorID });
        if (!book) {
            throw new NotFoundError('book not found with this authorID');
        }
        return book;
    }


}