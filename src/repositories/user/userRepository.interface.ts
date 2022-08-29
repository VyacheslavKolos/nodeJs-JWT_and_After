import { UpdateResult } from 'typeorm';
import { IUser } from '../../entity/user';

export interface IUserRepository{
    createUser(user:IUser):Promise<IUser>;
    getUsers(): Promise<IUser[]>;
    getUserByEmail(email:string):Promise<IUser | undefined>
    deleteUser(id:number):Promise<void>;
    updateUser(email:string, password:string, id:number):Promise<UpdateResult>;
}
