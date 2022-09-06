import { Request, Response } from 'express';
import { authService, tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { IUser } from '../entity/user';
import { tokenRepository } from '../repositories/token/tokenRepository';

class AuthController {
    public async registration(req: Request, res: Response) {
        const data = await authService.registration(req.body);
        res.cookie(
            'refreshToken',
            data.refreshToken,
            {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            },
        );
        return res.json(data);
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        await tokenService.deleteUserTokenPair(id);

        return res.json('OK');
    }

    async login(req: IRequestExtended, res: Response) {
        try {
            const {
                id,
                email,
                password: hashPassword,
            } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPasswords(password, hashPassword);

            const {
                refreshToken,
                accessToken,
            } = tokenService.generateTokenPair(
                {
                    userId: id,
                    userEmail: email,
                },
            );

            await tokenRepository.createToken({
                refreshToken,
                accessToken,
                userId: id,
            });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            res.status(400)
                .json(e);
        }
    }

    public async refreshToken(req: IRequestExtended, res: Response) {
        try {
            const refreshTokenToDelete = req.get('Authorization');
            const { id, email } = req.user as IUser;

            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });
            const { accessToken, refreshToken } = await
            tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({
                refreshToken,
                accessToken,
                userId: id,
            });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export const authController = new AuthController();
