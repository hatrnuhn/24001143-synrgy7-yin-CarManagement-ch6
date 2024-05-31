import { Router } from 'express';
import usersRouter from './users';
import authRouter from './auth';
import adminsRouter from './admins';
import carsRouter from './cars';
import { verifySuperAdminToken } from '../controllers/middlewares/auth';

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/admins', verifySuperAdminToken, adminsRouter);
router.use('/cars', carsRouter);

export default router;