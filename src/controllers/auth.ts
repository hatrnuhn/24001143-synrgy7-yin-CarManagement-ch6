import { RequestHandler } from "express";
import bcrypt from 'bcrypt';
import User from "../models/User";
import { NotFoundError, ValidationError } from "objection";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../repositories/errors";
import jwt from "jsonwebtoken";
import { LoginPayload } from "../models/dtos/responses";

export const login: RequestHandler = async (req, res) => {
    try {
        const secret = process.env.JWT_SECRET!;
        const { as } = req.query;
        const { username, password } = req.body;

        const user = await User.query()
            .findOne({ username })
            .withGraphFetched('[admin, superAdmin]');
        
        let payload: LoginPayload = null;
        switch (as) {
            case 'super':                
                const superAdmin = user?.superAdmin;

                if (!user || user.deletedAt || !superAdmin) throw new NotFoundError({ message: 'Super admin does not exist' });

                payload = {
                    superId: superAdmin.id,
                    userId: user.id,
                    email: user.email,
                    username: user.username,
                }
                break;
        
            case 'admin':
                const admin = user?.admin;

                if (!user || user.deletedAt || !admin) throw new NotFoundError({ message: 'Admin does not exist' });   

                payload = {
                    adminId: admin.id,
                    userId: user.id,
                    email: user.email,
                    username: user.username,
                }    
                break

            default:
                if(!user || user.deletedAt) throw new NotFoundError({ message: 'User does not exist' })

                payload = {
                    userId: user.id,
                    email: user.email,
                    username: user.username,
                }        
                break;
        }

        const result = await bcrypt.compare(password, user.password);

        if(!result) throw new ValidationError({ type: '', message: 'Invalid username-password combination'});

        const token = jwt.sign(payload, secret, { expiresIn: '30d' } );

        res.status(StatusCodes.OK).json({
            ...payload,
            token
        })    
    } catch (err) {
        errorHandler(err, res);
    }
}
