import { Router } from 'express';
import { CategoryController } from '../controler/category.controller';

const categoryController = new CategoryController();
const router = Router();

router.post('/create', categoryController.createCategory);

export default router;
