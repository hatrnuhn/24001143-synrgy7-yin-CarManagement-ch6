import { Router } from 'express';
import usersRouter from './users';
import authRouter from './auth';
import adminsRouter from './admins';
import carsRouter from './cars';

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/admins', adminsRouter);
router.use('/cars', carsRouter);

export default router;