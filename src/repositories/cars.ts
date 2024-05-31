import Car from "../models/Car";
import { CarUserResponse } from "../models/dtos/responses/cars";

const carToCarUserResponse = (car: Car): CarUserResponse => {
    return {
        id: car.id,
        model: car.model,
        manufacture: car.manufacture,
        year: car.year,
        plate: car.plate,
        transmission: car.transmission,
        type: car.type,
        rate: car.rate,
        description: car.description,
        specs: car.specs,
        options: car.options,
        availableDate: car.availableDate,
        createdAt: car.createdAt,
        updatedAt: car.updatedAt
    };
}

class CarRepository {
    async find(carId: string, isAdmin?: boolean ): Promise<Car | CarUserResponse | undefined> {
        let car = null;

        if (isAdmin) car = await Car.query().where({ id: carId }).first()
        else car = await Car.query().where({ id: carId, deletedAt: null }).first();

        if(!car) return undefined;

        return (isAdmin)? car : carToCarUserResponse(car);
    }

    async findAll(isAdmin?: boolean): Promise<Car[] | CarUserResponse[] > {
        let cars = null;
        if (isAdmin) cars = await Car.query()
        else cars = await Car.query().where({ deletedAt: null });
        
        return (isAdmin)? cars : cars.map((c, i) => {
            return carToCarUserResponse(c);
        });
    }

    async create(car: Partial<Car>, auth: { id: number, role: string }) {
        let newCar: Partial<Car> = {};

        switch (auth.role) {
            case 'super':
                newCar = {
                    ...car,
                    createdBySuper: auth.id
                }
                break;

            case 'admin':
                newCar = {
                    ...car,
                    createdByAdmin: auth.id
                }
                break;
        }
        return await Car.query().insertAndFetch(newCar);
    }

    async patch(carId: string, update: Partial<Car>, auth: { id: number, role: string }) {
        let patch: Partial<Car> = {}

        switch (auth.role) {
            case 'super':
                patch = {
                    ...update,
                    lastUpdatedBySuper: auth.id
                }
                break;

            case 'admin':
                patch = {
                    ...update,
                    lastUpdatedByAdmin: auth.id
                }
                break;
        }

        return await Car.query()
            .patch(update)
            .where({ id: carId, deletedAt: null })
            .returning('*')
            .first();
    }

    async delete(carId: string, auth: { id: number, role: string }) {
        let deletePatch: Partial<Car> = {
            deletedAt: new Date(),
        }

        switch (auth.role) {
            case 'super':
                deletePatch = {
                    ...deletePatch,
                    deletedBySuper: auth.id
                }
                break;

            case 'admin':
                deletePatch = {
                    ...deletePatch,
                    deletedByAdmin: auth.id
                }
                break;
        }

        return await Car.query()
            .patch(deletePatch)
            .where({ id: carId, deletedAt: null })
            .returning('*')
            .first();
    }
}

export default new CarRepository();