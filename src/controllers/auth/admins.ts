import { RequestHandler } from "express";
import User from "../../models/User";
import { NotFoundError, ValidationError } from "objection";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../../repositories/errors";
import bcrypt from 'bcrypt';

export const adminLogin: RequestHandler = async (req, res) => {
    const secret = process.env.JWT_SECRET!;

    try {
        const { username, password } = req.body;

        const user = await User.query()
            .findOne({ username })
            .withGraphFetched('admin')
        
        const admin = user?.admin;

        if (!user || user.deletedAt || !admin) throw new NotFoundError({ message: 'Specified admin does not exist' });

        const result = await bcrypt.compare(password, user.password);

        if (!result) throw new ValidationError({
            type: '',
            message: 'Invalid admin username-password combination'
        })
            
        const payload = {
            adminId: admin!.id,
            email: user.email,
            username: user.username
        }
    
        const token = jwt.sign(payload, secret);
    
        res.status(StatusCodes.OK).json({
            ...payload,
            adminToken: token
        });
    } catch (err) {
        errorHandler(err, res);
    }
}