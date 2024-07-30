// types/express.d.ts
import { IUser } from '../models/user.model.js'; // don't delete

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                roles: string[];
            };
        }
    }
}
