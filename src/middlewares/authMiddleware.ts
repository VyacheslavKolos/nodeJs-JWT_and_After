import { NextFunction, Request, Response } from 'express';
import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces/request-extended.interface';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res:Response, next:NextFunction) {
        try {
            const authToken = req.get('Authorization');
            if (!authToken) {
                throw new Error('No token');
            }

            const { userEmail } = tokenService.verifyToken(authToken);

            const userFromToken = await userService.getUserByEmail(userEmail);

            req.user = userFromToken;

            next();
        } catch (e:any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();
