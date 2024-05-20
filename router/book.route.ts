import { Router } from 'express';
import { BookController } from '../controler/book.controler';

import { adminOnly,anyLogedIn } from '../middleware/auth.middleware';

const categoryController = new BookController();

const router = Router();

router.post('/create',adminOnly, categoryController.createBook);
router.delete('/delete/:id',adminOnly,categoryController.deleteBook)
router.put('/update/:id',adminOnly,categoryController.updateBook)
router.get('/all',anyLogedIn,categoryController.getAllBooks)


export default router;
