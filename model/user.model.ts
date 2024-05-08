import { Document, Schema, model } from 'mongoose';

// Define the user interface
interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'author' | 'customer';
}

// Define the user schema
const userSchema = new Schema<UserDocument>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'author', 'customer'], required: true }
});

// Create the user model
const UserModel = model<UserDocument>('User', userSchema);

export {UserDocument, UserModel} ;
