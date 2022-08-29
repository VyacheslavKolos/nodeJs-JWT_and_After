import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user:IUser):Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getUsers(): Promise<IUser[]> {
        return getManager().getRepository(User).find({ relations: ['posts'] });

        // const user = await getManager().getRepository(User).findOne({
        //     where: {
        //         firstName: 'Kokos',
        //     },
        // });
        // res.json(user);

        //   SQL запит
        // const users = await getManager().getRepository(User)
        //     .createQueryBuilder('user')
        //     .where('user.firstName = "Kokos"')
        //     .getOne();
        // res.json(users);

        // Інший запит: тільки ті юзерси, які в своїх постах мають такі значення: "..."
        // const users = await getManager().getRepository(User)
        //     .createQueryBuilder('user')
        //     .leftJoin('Posts', 'posts', 'posts.userId = user.id')
        //     .where('posts.text = "Possssst"')
        //     .getMany();
        // res.json(users);
    }

    public async getUserByEmail(email:string):Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deleteAt IS NULL')
            .getOne();
    }

    public async deleteUser(id:number):Promise<void> {
        await getManager().getRepository(User).softDelete(id);
    }

    public async updateUser(email:string, password:string, id:number):Promise<UpdateResult> {
        return getManager()
            .getRepository(User)
            .update(id, {
                password,
                email,
            });
    }
}

export const userRepository = new UserRepository();
