import { Router } from "express";
import { superLogin } from "../../controllers/auth/supers";

const router = Router();

router.post('/login', superLogin);

export default router;