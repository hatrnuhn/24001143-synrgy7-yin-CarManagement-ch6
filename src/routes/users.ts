import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, patchUser } from "../controllers/users";
import { verifyAdminToken } from "../controllers/middlewares/auth";

const router = Router();

router.post('/', createUser);
router.get('/', verifyAdminToken, getAllUsers);
router.get('/:userId', getUserById);
router.patch('/:userId', patchUser);
router.delete('/:userId', deleteUser);

export default router;