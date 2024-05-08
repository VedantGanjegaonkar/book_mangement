import { Request, Response } from 'express';
import { CategoryModel, ICategory } from '../model/category.model';

export class CategoryController {
    public async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body;

            // Check if category with the same name already exists
            const existingCategory = await CategoryModel.findOne({ name });
            if (existingCategory) {
                res.status(400).json({ message: 'Category with this name already exists' });
                return;
            }

            // Create a new category
            const newCategory: ICategory = await CategoryModel.create({ name });

            res.status(201).json({ message: 'Category created successfully', category: newCategory });
        } catch (err) {
            res.status(500).json({ message: 'Failed to create category', error: err.message });
        }
    }
}


