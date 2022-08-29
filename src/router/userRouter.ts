import { Router } from 'express';
import { userController } from '../controller/userController';

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserByEmail);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.updateUser);

export const userRouter = router;
