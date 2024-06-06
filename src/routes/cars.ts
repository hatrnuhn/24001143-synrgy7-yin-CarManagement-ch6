import { Router } from "express";
import { getCars, getCarById, createCar, patchCar, deleteCar } from "../controllers/cars";
import { verifyAdminToken, verifySuperAdminToken, checkGetCarRole } from "../controllers/middlewares/auth";

const router = Router();

router.get('/', checkGetCarRole, verifySuperAdminToken, verifyAdminToken, getCars);
router.get('/:carId', checkGetCarRole, verifySuperAdminToken, verifyAdminToken, getCarById);

router.post('/', verifyAdminToken, createCar);

router.patch('/:carId', verifyAdminToken, patchCar);

router.delete('/:carId', verifyAdminToken, deleteCar);

export default router;