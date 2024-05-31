import { Router } from "express";
import { makeAdmin, demoteAdmin } from "../controllers/users";
import { verifySuperAdminToken } from "../controllers/middlewares/auth";

const router = Router();

router.post('/', verifySuperAdminToken, makeAdmin);
router.delete('/:adminId', verifySuperAdminToken, demoteAdmin);

export default router;