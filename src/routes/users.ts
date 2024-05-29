import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, patchUser } from "../controllers/users";
import { checkUserIDExists } from "../controllers/middlewares";

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.patch('/:userId', patchUser);
router.delete('/:userId', deleteUser);

export default router;