import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';


interface CustomRequest extends Request {
    user?: any; // Define the user property as optional
}

export function authenticateToken(req: CustomRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];
   
    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    
    jwt.verify(authHeader, 'secret', (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        }
        req.user = user;
        next();
    });
}
