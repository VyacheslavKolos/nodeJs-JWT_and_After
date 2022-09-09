import { Router } from 'express';
import { userRouter } from './userRouter';
import { postRouter } from './postRouter';
import { authRouter } from './authRouter';

const router = Router();

router.use('/users', userRouter);

router.use('/posts', postRouter);

router.use('/auth', authRouter);

// @ts-ignore
router.use('*', (err, req, res, next) => {
    console.log('-----------------');
    console.log(err);
    console.log('-----------------');
    res.status(err.code || 500).json({
        message: err.message,
    });
});

export const apiRouter = router;
