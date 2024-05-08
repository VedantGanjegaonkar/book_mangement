
import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { UserController} from '../controler/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const userController = new UserController();

const router = Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.login);


interface CustomRequest extends Request {
    user?: any; // Define the user property as optional
}

router.get('/protected', authenticateToken, (req: CustomRequest, res: Response) => {
    res.status(200).json({ message: 'Protected route', user: req.user.role });
});

export default router;
