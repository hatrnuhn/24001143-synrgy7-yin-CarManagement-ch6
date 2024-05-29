import usersRouter from './users';
import authRouter from './auth';
import { Router } from 'express';
import adminsRouter from './admins';

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/admins', adminsRouter);

export default router;