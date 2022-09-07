import { NextFunction, Response } from 'express';

import Joi from 'joi';
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

    checkIsMailAndPasswordValid(req:IRequestExtended, res:Response, next: NextFunction) {
        const loginSchema = Joi.object({
            email: Joi.string().email().lowercase().required(),
            password: Joi.string().min(5).required(),
        });

        const { error } = loginSchema.validate(req.body);
        if (error) {
            res.status(400)
                .json(error);
            // throw new Error(`Validation error: ${error.details.map((x) => x.message).
            // join(', ')}`);
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            next();
        }
    }

    checkIsUserValid(req:IRequestExtended, res:Response, next: NextFunction){
        const registrationSchema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            age: Joi.number().max(100).min(0).required(),
            phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });

        const { error } = registrationSchema.validate(req.body);
        if (error) {
            res.status(400)
                .json(error.message);
            // throw new Error(`Validation error: ${error.details.map((x) => x.message).
            // join(', ')}`);
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            next();
        }
    }
}

export const userMiddleware = new UserMiddleware();
