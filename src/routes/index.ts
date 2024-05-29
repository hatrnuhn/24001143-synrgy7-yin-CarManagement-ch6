import usersRouter from './users';
import authRouter from './auth';
import { Router } from 'express';

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;