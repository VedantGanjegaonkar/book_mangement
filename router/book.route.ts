import { Router } from 'express';
import { BookController } from '../controler/book.controler';

const categoryController = new BookController();

const router = Router();

router.post('/create', categoryController.createBook);
router.delete('/delete/:id',categoryController.deleteBook)
router.put('/update/:id',categoryController.updateBook)
router.get('/',categoryController.getAllBooks)
router.get('/get/:id',categoryController.getBookById)

export default router;
