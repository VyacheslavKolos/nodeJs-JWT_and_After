import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories/user/userRepository';

class UserMiddleware {
    async checkIsUserExists(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const userFromDb = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDb) {
                res.status(404).json('User not found');
                return;
            }

            req.user = userFromDb;
            next();
        } catch (e) {
            res.status(400)
                .json(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
