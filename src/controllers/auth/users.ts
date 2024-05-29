import { RequestHandler } from "express";
import bcrypt from 'bcrypt';
import User from "../../models/User";
import { NotFoundError, ValidationError } from "objection";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../../repositories/errors";
import jwt from "jsonwebtoken";

const userLogin: RequestHandler = async (req, res) => {
    try {
        const secret = process.env.JWT_SECRET!;
        const { username, password } = req.body;
    
        const user = await User.query()
            .findOne({ username });
    
        if(!user || user.deletedAt) throw new NotFoundError({ message: 'User does not exist' })
        
        const result = await bcrypt.compare(password, user.password);

        if(!result) throw new ValidationError({ type: '', message: 'Invalid username-password combination'});

        const payload = {
            id: user.id,
            email: user.email,
            username: user.username
        }
        const token = jwt.sign(payload, secret);

        res.status(StatusCodes.OK).json({
            ...payload,
            token
        })    
    } catch (err) {
        errorHandler(err, res);
    }
}

export default {
    userLogin
}