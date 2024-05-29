import { RequestHandler } from "express";
import User from "../../models/User";
import { StatusCodes } from "http-status-codes";
import usersRepo from '../../repositories/users';

export const checkUserIDExists: RequestHandler = async (req, res, next) => {
    const { userId } = req.params;
    
    const user = await usersRepo.find(+userId);

    if (!user) 
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });

    next();
}

export const printRequest: RequestHandler = (req, res, next) => {
    const method = req.method;
    const path = req.baseUrl + req.path;

    console.log(method, ' ', path);

    next();
}