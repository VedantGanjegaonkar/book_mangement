// user.controler book
import { Request, Response } from 'express';
import {UserModel} from '../model/user.model';
import { AuthService } from '../services/user.services';
import * as jwt from 'jsonwebtoken';

export class UserController {

    private authService: AuthService;   //define a object named authService

    constructor() {
        this.authService = new AuthService(); //giving instance of class(AuthService) to that object 
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password, role } = req.body;

            // Check if the email is already registered
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'Email is already registered' });
                return;
            }

            // Create a new user
            const newUser = new UserModel({ username, email, password, role });
            await newUser.save();

            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (err) {
            res.status(500).json({ message: 'Failed to create user', error: err.message });
        }
    }

    
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await UserModel.findOne({ email,password });
            if (!user) {
                res.status(401).json({ message: 'user not found' });
                return;
            }

           
            // Generate JWT token
            const token = jwt.sign({ userId: user._id, role: user.role }, 'secret', { expiresIn: '1h' });

            res.status(200).json({ message: 'Login successful', token });
        } catch (err) {
            res.status(500).json({ message: 'Failed to login', error: err.message });
        }
    }

    // public async login(req: Request, res: Response): Promise<void> {
    //     try {
    //         await this.authService.handleUserLogin(req, res);
    //     } catch (error:any) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }
}
