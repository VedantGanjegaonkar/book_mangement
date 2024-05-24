import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';


interface CustomRequest extends Request {
    user?: any; // Define the user property as optional
}

export function adminOnly(req: CustomRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];
   
    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    
    const user = jwt.verify(authHeader, 'secret') as { userId: string; role: string; iat: number; exp: number; };
    if (!user) {
        res.status(403).json({ message: 'Forbidden' });
        return;
    }
    if (user.role !== 'admin'){
        res.status(403).json({ message: 'u are not a admin,only admin have the access to this endpoints' });
        return;
    }


    req.user = user;
    console.log(user);
    next();
}


export function anyLogedIn(req: CustomRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];
   
    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    
    const user = jwt.verify(authHeader, 'secret') as { userId: string; role: string; iat: number; exp: number; };
    if (!user) {
        res.status(403).json({ message: 'Forbidden' });
        return;
    }
    //gg
    req.user = user;
    console.log(user);
    next();
}
