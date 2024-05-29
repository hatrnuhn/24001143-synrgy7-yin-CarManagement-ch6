import { RequestHandler } from 'express';
import userService from '../services/users';
import { StatusCodes } from 'http-status-codes';
import { UserPatch } from '../models/dtos/users';
import User from '../models/User';
import { errorHandler } from '../repositories/errors';

export const getAllUsers: RequestHandler = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        res.status(StatusCodes.OK).json(users);
    } catch (err) {
        errorHandler(err, res);
    }
}

export const getUserById: RequestHandler = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userService.getUserById(+userId);

        if(!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: 'User is not found'
            })
        }

        res.status(StatusCodes.OK).json(user);
    } catch (err) {
        errorHandler(err, res);
    }
}

export const createUser: RequestHandler = async (req, res) => {
    const body = req.body as User;

    try {
        const savedUser = await userService.createUser(body);

        res.status(StatusCodes.CREATED).json(savedUser);
    } catch (err) {
        errorHandler(err, res);
    }
}

export const patchUser: RequestHandler = async (req, res) => {
    const { userId } = req.params;
    const body = req.body as UserPatch;

    try {
        const patchedUser = await userService.patchUser(+userId, body);

        res.status(StatusCodes.OK).json(patchedUser);
    } catch (err) {
        errorHandler(err, res);
    }
}

export const deleteUser: RequestHandler = async (req, res) => {
    const { userId } = req.params;

    try {
        await userService.deleteUser(+userId);

        res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
        errorHandler(err, res);
    }
}

export const makeAdmin: RequestHandler = async (req, res) => {
    const { userId } = req.params;

    try {
        const newAdmin = await userService.makeAdmin(+userId);


        res.sendStatus(StatusCodes.OK).json(newAdmin);
    } catch (err) {
        errorHandler(err, res);
    }
}