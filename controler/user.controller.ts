import { Request, Response } from 'express';
import { UserModel } from '../model/user.model';
import { AuthService } from '../services/user.services';

export class UserController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        console.log(this);
        this.login = this.login.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await this.authService.findUserByEmail(email);
            if (!user) {
                res.status(401).json({ message: 'email not found' });
                return;
            }

            // Check if the password is correct
            const isPasswordValid = await this.authService.validatePassword(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Invalid password' });
                return;
            }

            // Generate JWT token
            const token = this.authService.generateAuthToken(user._id, user.role);
            res.status(200).json({ message: 'Login successful', token });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ message: 'Failed to login', error: err.message });
        }
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
        } catch (err: any) {
            res.status(500).json({ message: 'Failed to create user', error: err.message });
        }
    }
}
