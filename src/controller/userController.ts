import { Request, response, Response } from 'express';

import { UpdateResult } from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../entity/user';
import { userService } from '../services/userService';

class UserController {
    public async createUser(req:Request, res:Response):Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUsers(req:Request, res:Response):Promise<Response<IUser[]>> {
        const users = await userService.getUsers();
        return res.json(users);
    }

    public async getUserByEmail(req:Request, res:Response):Promise<Response<IUser>> {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }

    public async deleteUser(req:Request, res:Response):Promise<any> {
        try {
            const { id } = req.params;
            await userService.deleteUser(+id);
            return res.send(response.status(StatusCodes.NO_CONTENT));
        } catch (err) {
            return res.send(response.status(StatusCodes.BAD_REQUEST));
        }
    }

    public async updateUser(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { password, email } = req.body;
        const { id } = req.params;
        const updatedUser = await userService.updateUser(email, password, +id);
        return res.json(updatedUser);
    }
}

export const userController = new UserController();
