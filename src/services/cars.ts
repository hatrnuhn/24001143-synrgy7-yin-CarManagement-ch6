import CarRepo from "../repositories/cars";
import Car from "../models/Car";

class CarService {
    async getAllCars(isAdmin?: boolean) {
        return await CarRepo.findAll(isAdmin);
    }

    async getCarById(carId: string, isAdmin?: boolean) {
        return await CarRepo.find(carId, isAdmin);
    }

    async createCar(car: Partial<Car>, auth: { id: number, role: string}) {
        return await CarRepo.create(car, auth);
    }

    async patchCar(carId: string, update: Partial<Car>, auth: { id: number, role: string}) {
        return await CarRepo.patch(carId, update, auth);
    }

    async deleteCar(carId: string, auth: { id: number, role: string}) {
        return await CarRepo.delete(carId, auth);
    }
}

export default new CarService();