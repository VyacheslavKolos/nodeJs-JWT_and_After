import { IPost } from '../../entity/post';

export interface IPostRepository{
    createPost(post:IPost):Promise<IPost>;
    getPosts(): Promise<IPost[]>
}
