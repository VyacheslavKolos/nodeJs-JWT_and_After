import { Request, Response } from 'express';
import { authService, tokenService } from '../services';

class AuthController {
    public async registration(req:Request, res:Response) {
        const data = await authService.registration(req.body);
        res.cookie(
            'refreshToken',
            data.refreshToken,
            { maxAge: 24 * 60 * 60 * 1000, httpOnly: true },
        );
        return res.json(data);
    }

    public async logout(req:Request, res:Response): Promise<Response<string>> {

        res.clearCookie('refreshToken');
        await tokenService.deleteUserTokenPair(3);

        return res.json('OK');
    }
}

export const authController = new AuthController();
