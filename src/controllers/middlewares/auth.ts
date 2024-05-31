import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import { errorHandler } from "../../repositories/errors";
import { AuthorizationError } from "../../models/Errors";

export const verifySuperAdminToken: RequestHandler = async (req, res, next) => {
    const secret = process.env.JWT_SECRET!;

    const { authorization } = req.headers;
    
    if (!authorization) throw new AuthorizationError('Invalid authentication');
    
    try {
        const data = jwt.verify(authorization.split(' ')[1], secret) as jwt.JwtPayload;

        if(data.role !== "super") throw new AuthorizationError('Not a super admin');

        next();
    } catch (err) {
        errorHandler(err, res);
    }
}

export const verifyAdminToken: RequestHandler = (req, res, next) => {
        const secret = process.env.JWT_SECRET!;

        const { authorization } = req.headers;

        if (!authorization) throw new AuthorizationError('Invalid authentication');
        
        try {
        
            const data = jwt.verify(authorization.split(' ')[1], secret) as jwt.JwtPayload;
    
            if(String(data.role) !== "admin") throw new AuthorizationError('Not an admin');
    
            next();
        } catch (err) {
            errorHandler(err, res);
        }

}

export const verifyUserToken: RequestHandler = (req, res, next) => {
        const secret = process.env.JWT_SECRET!;

        const { authorization } = req.headers;
        
        if (!authorization) throw new AuthorizationError('Invalid authentication');
        
        try {
            const data = jwt.verify(authorization.split(' ')[1], secret) as jwt.JwtPayload;

            if(String(data.role) !== "user") throw new AuthorizationError('Not a user');
    
            next();    
        } catch (err) {
            errorHandler(err, res);
        }
}