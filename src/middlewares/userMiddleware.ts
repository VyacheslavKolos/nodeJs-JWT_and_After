import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories/user/userRepository';
import { ErrorHandler } from '../errors/ErrorHandler';

class UserMiddleware {
    async checkIsUserExists(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const userFromDb = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDb) {
                next(new ErrorHandler('User not found', 404));
                return;
            }

            req.user = userFromDb;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
