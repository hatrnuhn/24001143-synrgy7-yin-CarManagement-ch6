import { RequestHandler } from "express";
import { Car } from "../models/Car";
import { StatusCodes } from "http-status-codes";

export const getCars: RequestHandler = async (req, res) => {
    const cars = await Car.query()
        .where({ deletedAt: null });

    res.status(StatusCodes.OK).json(cars);
}