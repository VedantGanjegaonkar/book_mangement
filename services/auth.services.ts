// auth.services books 
import * as jwt from 'jsonwebtoken';

import { UserDocument } from '../model/user.model';

const secret = 'myvv';

function setId(user: UserDocument): string {
    return jwt.sign({ _id: user._id, email: user.email }, secret);
}

function getId(token: string | null): string | null {
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, secret) as { _id: string; email: string };
        return decoded._id;
    } catch (error) {
        return null;
    }
}

export { setId, getId };



