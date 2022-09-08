import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authController } from '../controller/authController';
import { authMiddleware, userMiddleware } from '../middlewares';
import { authValidator } from '../validators';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', celebrate(authValidator.login), userMiddleware.checkIsUserExists, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

export const authRouter = router;
