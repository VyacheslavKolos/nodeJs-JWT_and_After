import { getManager } from 'typeorm';
import { IToken, Token } from '../../entity/token';
import { ITokenDataToSave } from '../../interfaces';
import { ITokenRepository } from './tokenRepository.interface';

class TokenRepository implements ITokenRepository {
    public async createToken(token:ITokenDataToSave):Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserId(userId:number):Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async deleteByParams(findObject : Partial<IToken>) {
        return getManager().getRepository(Token).delete(findObject);
    }
}

export const tokenRepository = new TokenRepository();
