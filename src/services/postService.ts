import { postRepository } from '../repositories/post/postRepository';
import { IPost } from '../entity/post';

class PostService {
    public async createPost(post:IPost):Promise<IPost> {
        const createdPost = postRepository.createPost(post);
        return createdPost;
    }

    public async getPosts():Promise<IPost[]> {
        const posts = postRepository.getPosts();
        return posts;
    }
}

export const postService = new PostService();
