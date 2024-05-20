import { NextFunction, Request, Response } from 'express';
import { AuthorModel, IAuthor } from '../model/author.model';
import { authorServices } from '../services/author.service';
import{errorHandler} from "../middleware/errorHandler"
class AuthorController {
    private authorServices:authorServices;

    constructor(){
        this.authorServices=new authorServices()
        this.deleteAuthor=this.deleteAuthor.bind(this)
    }

    
    public async deleteAuthor(req: Request, res: Response,next:NextFunction): Promise<void> { 
        try {
            const authorId = req.params.id;

            await this.authorServices.deleteAuther(authorId)
            
            res.status(200).json({ message: 'Author and his books deleted successfully' });
        } catch (err : any) {
            errorHandler(err,req,res,next)
        }
    }

    public async createAuthor(req: Request, res: Response): Promise<void> {
        try {
            const { name, biography, nationality } = req.body;
            const author: IAuthor = await AuthorModel.create({
                name,
                biography,
                nationality
            });
            res.status(201).json({ message: 'Author created successfully', author });
        } catch (err: any) {
            res.status(500).json({ message: 'Failed to create author', error: err.message });
        }
    }


    public async updateAuthor(req: Request, res: Response): Promise<void> {
        try {
            const authorId = req.params.id;
            const { name, biography, nationality } = req.body;

            const updatedAuthor = await AuthorModel.findByIdAndUpdate(
                authorId,
                { name, biography, nationality },
                { new: true }
            );

            if (!updatedAuthor) {
                res.status(404).json({ message: 'Author not found' });
                return;
            }

            res.status(200).json({ message: 'Author updated successfully', author: updatedAuthor });
        } catch (err : any) {
            res.status(500).json({ message: 'Failed to update author', error: err.message });
        }
    }

    public async getAuther(req: Request, res: Response):Promise<void>{

        try {
            const authors=await AuthorModel.find({})
            res.status(200).json(authors)
            
        } catch (error : any) {
            res.status(500).json({ message: 'Failed to get author', error: error.message });
        }
    }
}

export default new AuthorController();
