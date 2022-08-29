import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';
import { IToken } from '../entity/token';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { IUserPayload } from '../interfaces/token.interface';

class TokenService {
    public async generateTokenPair(payload: any):
        Promise<{ accessToken: string, refreshToken: string }> {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACCESS },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.EXPIRES_IN_REFRESH },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, refreshToken: string): Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        return tokenRepository.createToken({
            refreshToken,
            userId,
        });
    }

    async deleteUserTokenPair(userId: number) {
        return tokenRepository.delete({ userId });
    }

    verifyToken(authToken: string, tokenType = 'access'): IUserPayload {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();
