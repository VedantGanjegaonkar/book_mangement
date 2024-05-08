import { Request, Response } from 'express';
import { AuthorModel, IAuthor } from '../model/author.model';

class AuthorController {
    public async createAuthor(req: Request, res: Response): Promise<void> {
        try {
            const { name, biography, nationality } = req.body;
            const author: IAuthor = await AuthorModel.create({
                name,
                biography,
                nationality
            });
            res.status(201).json({ message: 'Author created successfully', author });
        } catch (err) {
            res.status(500).json({ message: 'Failed to create author', error: err.message });
        }
    }

    public async deleteAuthor(req: Request, res: Response): Promise<void> { 
        try {
            const authorId = req.params.id;
            const author = await AuthorModel.findById(authorId);
            if (!author) {
                res.status(404).json({ message: 'Author not found' });
                return;
            }
            await AuthorModel.deleteOne({ _id: authorId });
            res.status(200).json({ message: 'Author deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Failed to delete author', error: err.message });
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
        } catch (err) {
            res.status(500).json({ message: 'Failed to update author', error: err.message });
        }
    }

    public async getAuther(req: Request, res: Response):Promise<void>{

        try {
            const authors=await AuthorModel.find({})
            res.status(200).json(authors)
            
        } catch (error) {
            res.status(500).json({ message: 'Failed to get author', error: error.message });
        }
    }
}

export default new AuthorController();
