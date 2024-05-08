import { Router } from 'express';
import AuthorController from '../controler/author.controller';


const router = Router();
router.get('/getAllAuther',AuthorController.getAuther)
router.post('/create', AuthorController.createAuthor);
router.delete('/delete/:id', AuthorController.deleteAuthor);
router.put('/update/:id', AuthorController.updateAuthor);


export default router;
