import { RequestHandler } from 'express';
import userService from '../services/users';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import { errorHandler } from '../repositories/errors';
import { NotFoundError } from 'objection';
import { BadRequestBodyError } from '../models/Errors';

export const getAllUsers: RequestHandler = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        res.status(StatusCodes.OK).json(users);
    } catch (err) {
        errorHandler(err, res);
    }
}

export const getUserById: RequestHandler = async (req, res) => {
    let { userId } = req.params;

    userId = parseInt(userId)? userId : res.locals.userId;

    try {
        const user = await userService.getUserById(+userId);

        if(!user) throw new NotFoundError({ message: 'User does not exist' });

        res.status(StatusCodes.OK).json(user);
    } catch (err) {
        errorHandler(err, res);
    }
}

export const createUser: RequestHandler = async (req, res) => {
    const body = req.body as User;

    try {
        const savedUser = await userService.createUser(body);

        if (!savedUser) throw new NotFoundError({ message: 'User does not exist' });

        res.status(StatusCodes.CREATED).json(savedUser);
    } catch (err) {
        errorHandler(err, res);
    }
}

export const patchUser: RequestHandler = async (req, res) => {
    const { userId } = req.params;
    const body = req.body as Partial<User>;

    try {
        const patchedUser = await userService.patchUser(+userId, body);

        if (!patchedUser) throw new NotFoundError({ message: 'User does not exist' });

        res.status(StatusCodes.OK).json(patchedUser);
    } catch (err) {
        errorHandler(err, res);
    }
}

export const deleteUser: RequestHandler = async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedUser = await userService.deleteUser(+userId);

        if (!deletedUser) throw new NotFoundError({ message: 'User does not exist' });

        res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
        errorHandler(err, res);
    }
}

export const makeAdmin: RequestHandler = async (req, res) => {
    const { admin, userId } = req.body;

    try {
        let newAdmin = null;
        if (admin && userId) throw new BadRequestBodyError('Bad request');

        if (userId) newAdmin = await userService.makeAdmin(+userId)
        else if (admin) newAdmin = await userService.createAdmin(admin);

        if (!newAdmin) throw new NotFoundError({ message: 'User is not found' });

        res.status(StatusCodes.OK).json({
            adminId: newAdmin.id,
            email: newAdmin.user.email,
            username: newAdmin.user.username,
        });
    } catch (err) {
        errorHandler(err, res);
    }
}

export const demoteAdmin: RequestHandler = async (req, res) => {
    const { adminId } = req.params;

    try {
        const removed = await userService.removeAdmin(+adminId);

        if(!removed) throw new NotFoundError({ message: 'Admin does not exist' });

        res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
        errorHandler(err, res);
    }
}