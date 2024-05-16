// services/user.service.ts  book 
import { UserDocument,UserModel } from '../model/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



export class AuthService {
   
 
   public async findUserByEmail(email: string): Promise<UserDocument | null> {
        console.log(email)
        return await UserModel.findOne({ email });
    }
    
    public async validatePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }
    
    public  generateAuthToken(userId: string, role: string): string {
        return jwt.sign({ userId, role }, 'secret', { expiresIn: '1h' });
    }
}

// export { AuthService };
