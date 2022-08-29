import bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';
import { IUser } from '../entity/user';
import { userRepository } from '../repositories/user/userRepository';

class UserService {
    public async createUser(user:IUser):Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        const createdUser = userRepository.createUser(dataToSave);
        return createdUser;
    }

    public async getUsers():Promise<IUser[]> {
        const users = userRepository.getUsers();
        return users;
    }

    public async getUserByEmail(email:string):Promise<IUser | undefined > {
        return userRepository.getUserByEmail(email);
    }

    public async deleteUser(id:number):Promise<void> {
        await userRepository.deleteUser(id);
    }

    public async updateUser(email:string, password:string, id:number):Promise<UpdateResult> {
        const updatedUser = userRepository.updateUser(email, password, id);
        return updatedUser;
    }

    private async _hashPassword(password:string):Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
