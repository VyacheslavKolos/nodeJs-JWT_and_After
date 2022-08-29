import { Request, Response } from 'express';

import { IPost } from '../entity/post';
import { postService } from '../services/postService';

class PostController {
    public async createPost(req:Request, res:Response):Promise<Response<IPost>> {
        const createdPost = await postService.createPost(req.body);
        return res.json(createdPost);
    }

    public async getPosts(req:Request, res:Response):Promise<Response<IPost[]>> {
        const posts = await postService.getPosts();
        return res.json(posts);
    }
}

export const postController = new PostController();
