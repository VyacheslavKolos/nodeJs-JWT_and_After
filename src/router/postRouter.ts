import { Router } from 'express';
import { postController } from '../controller/postController';

const router = Router();

router.get('/', postController.getPosts);

router.post('/', postController.createPost);

export const postRouter = router;
