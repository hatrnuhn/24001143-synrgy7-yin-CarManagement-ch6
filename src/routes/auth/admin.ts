import { Router } from "express";
import { adminLogin } from "../../controllers/auth/admins";

const router = Router();

router.post('/login', adminLogin);

export default router;