// services/user.service.ts book 
import { UserDocument,UserModel } from '../model/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { AppError, NotFoundError, ValidationError, UnauthorizedError } from '../utils/errors';

interface CreateUserParams {
    username: string;
    email: string;
    password: string;
    role: string;
}

export class UserService {
   
    public async findUserByEmail(email: string) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new NotFoundError('Email not found');
        }
        return user;
    }
    
    public async validatePassword(password: string, hashedPassword: string) {
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordValid) {
            throw new UnauthorizedError('Invalid password');
        }
        return isPasswordValid;
    }
    
    public  generateAuthToken(userId: string, role: string): string {
        return jwt.sign({ userId, role }, 'secret', { expiresIn: '10h' });
    }

    public async createUser(params: CreateUserParams) {
        const { username, email, password, role } = params;

        // Check if the email is already registered
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new ValidationError('Email is already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({ username, email, password:hashedPassword, role });
        await newUser.save();
        return newUser;
    }
}





