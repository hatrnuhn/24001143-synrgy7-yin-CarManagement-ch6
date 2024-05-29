import { Router } from "express";
import { userLogin } from '../../controllers/auth';
import authAdminRouter from './admin';
import authSuperRouter from './super';

const router = Router();

router.use('/super', authSuperRouter);
router.use('/admin', authAdminRouter);
router.post('/login', userLogin);
// router.post('/logout', userLogout);

export default router;