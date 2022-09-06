import { NextFunction, Response } from 'express';
import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { constants } from '../constants';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res:Response, next:NextFunction) {
        try {
            const accessToken = req.get(constants.AUTHORIZATION); // ('Authorization')
            if (!accessToken) {
                throw new Error('No token');
            }

            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDb = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDb) {
                throw new Error('token not valid');
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('token not valid');
            }

            req.user = userFromToken;

            next();
        } catch (e:any) {
            res.status(401).json({
                status: 401,
                message: e.message,
            });
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res:Response, next:NextFunction) {
        try {
            const refreshToken = req.get(constants.AUTHORIZATION); // ('Authorization')
            if (!refreshToken) {
                throw new Error('No token');
            }

            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDb = await tokenRepository.findByParams({ refreshToken });

            if (!tokenPairFromDb) {
                throw new Error('token not valid');
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('token not valid');
            }

            req.user = userFromToken;

            next();
        } catch (e:any) {
            res.status(401).json({
                status: 401,
                message: e.message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();
