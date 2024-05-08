// services/user.service.ts  book 
import { Request, Response } from 'express';
import { UserDocument } from '../model/user.model';

import { setId } from './auth.services';

import { userQuery } from '../query/user.query'; 

class AuthService {
    private userQueryObj:userQuery;
    constructor(){
        this.userQueryObj=new userQuery()
    }

    public async handleUserLogin(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const user: UserDocument | null = await this.userQueryObj.findByemailAndPassword(email,password)
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const token: string = setId(user);
        
        console.log(token)
        
    }
}

export { AuthService };
