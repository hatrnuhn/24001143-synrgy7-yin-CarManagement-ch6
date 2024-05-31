import { Router } from "express";
import { makeAdmin, demoteAdmin } from "../controllers/users";

const router = Router();

router.post('/', makeAdmin);
router.delete('/:adminId', demoteAdmin);

export default router;