import { ObjectId } from "mongoose";
import mongoose from 'mongoose';
import { BookModel } from "../model/book.model";
import { AuthorModel } from "../model/author.model";
import{bookServices} from "./book.services"
import { NotFoundError } from "../utils/errors";

export class authorServices{

    private bookservice:bookServices;
    constructor(){

        this.bookservice=new bookServices()
        this.deleteAuther=this.deleteAuther.bind(this)
    }


    public async deleteAuther(authorID:String){

        const session=await mongoose.startSession();

        const author= await AuthorModel.findById({_id:authorID})
        if(!author){
            throw new NotFoundError("author not found men")
            
        }

        session.startTransaction();

        try {
            await AuthorModel.deleteOne({_id:authorID})
            await BookModel.deleteMany({author:authorID})

            await session.commitTransaction();
            
        } catch (error) {

            await session.abortTransaction();
            throw new NotFoundError("author not found to delte")
            
        } finally {
            session.endSession();
        }
      
        
    }

}




// {
//     "title":"2 STATES",
//     "author":"664b542dae7cfda3ec40569c",
//     "category":["663b6562687651a3e5ad6631","663b656a687651a3e5ad6634"],
//     "ISBN":"25-9",
//     "price":"250",
//     "description":"2 states"
//    }
