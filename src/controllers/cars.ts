import { RequestHandler } from "express";
import Car from "../models/Car";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../repositories/errors";
import { NotFoundError } from "objection";
import CarsService from '../services/cars';
import { CarUserResponse } from "../models/dtos/responses/cars";

export const getCars: RequestHandler = async (req, res) => {
    const { superId, adminId } = res.locals;

    try {
        let cars: Car[] | CarUserResponse[] = [];

        if (superId || adminId) cars = await CarsService.getAllCars(true);
        else cars = await CarsService.getAllCars();
        
        res.status(StatusCodes.OK).json(cars);
    } catch (err) {
        errorHandler(err, res);
    }
}

export const getCarById: RequestHandler = async (req, res) => {
    const { carId } = req.params;
    const { superId, adminId } = res.locals;

    try {
        let car: Car | CarUserResponse | undefined = undefined;
        if (superId || adminId) car = await CarsService.getCarById(carId, true)
        else car = await CarsService.getCarById(carId);
            
        if (!car) throw new NotFoundError({ message: 'Car does not exist' });

        res.status(StatusCodes.OK).json(car);
    } catch (err) {
        errorHandler(err, res);
    }

}

export const createCar: RequestHandler = async (req, res) => {
    const body = req.body;

    const { adminId, superId } = res.locals
    const now = new Date();

    let newCar: Partial<Car> = {
        ...body,
        availableDate: now,
        createdAt: now,
        updatedAt: now
    }

    let auth = null;

    if (adminId) {
        newCar = {
            ...newCar,
            createdByAdmin: adminId,
            lastUpdatedByAdmin: adminId
        }

        auth = { id: adminId, role: 'admin' };
    } else {
        newCar = {
            ...newCar,
            createdBySuper: superId,
            lastUpdatedBySuper: superId
        }

        auth = { id: superId,  role: 'super'};
    }

    try {
        let savedCar = null;
        
        if (auth) {
            savedCar = await CarsService.createCar(newCar, auth);
        }
        
        res.status(StatusCodes.CREATED).json(savedCar);
    } catch (err) {
        errorHandler(err, res);
    }
}

export const patchCar: RequestHandler = async (req, res) => {
    const { carId } = req.params;
    const patch = req.body;

    const { adminId, superId } = res.locals;

    try {
        let patchedCar = null;

        if (adminId) {
            patchedCar = await CarsService.patchCar(carId, patch, { id: adminId, role: 'admin' });
        } else {
            patchedCar = await CarsService.patchCar(carId, patch, { id: superId, role: 'super' });
        }

        if (!patchedCar) throw new NotFoundError({ message: 'Car does not exist' });

        res.status(StatusCodes.OK).json(patchedCar);
    } catch (err) {
        errorHandler(err, res);
    }
}

export const deleteCar: RequestHandler = async (req, res) => {
    const { carId } = req.params;

    const { adminId, superId } = res.locals;

    try {
        let deletedCar = null;
        if (adminId) deletedCar = await CarsService.deleteCar(carId, { id: adminId, role: 'admin' })
        else deletedCar = await CarsService.deleteCar(carId, { id: superId, role: 'super' });

        if (!deletedCar) throw new NotFoundError({ message: 'Car does not exist' });

        res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
        errorHandler(err, res);
    }
}