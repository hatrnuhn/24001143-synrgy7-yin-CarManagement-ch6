import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import { errorHandler } from "../../repositories/errors";
import { AuthenticationError, AuthorizationError } from "../../models/Errors";

export const verifySuperAdminToken: RequestHandler = async (req, res, next) => {
    const secret = process.env.JWT_SECRET!;

    if (res.locals.skipVerif || res.locals.skipSuperAdminVerif) return next();

    const { authorization } = req.headers;
        
    try {
        if (!authorization) throw new AuthorizationError('Invalid authentication');

        const data = jwt.verify(authorization.split(' ')[1], secret) as jwt.JwtPayload;

        if(!data.superId) throw new AuthorizationError('Not a super admin');

        res.locals.superId = data.superId;
        res.locals.skipVerif = true;

        next();
    } catch (err) {
        errorHandler(err, res);
    }
}

export const verifyAdminToken: RequestHandler = (req, res, next) => {
    const secret = process.env.JWT_SECRET!;
    
    if (res.locals.skipVerif || res.locals.skipAdminVerif) return next();

    const { authorization } = req.headers;
    
    try {
        if (!authorization) throw new AuthenticationError('Invalid authentication');

        const data = jwt.verify(authorization.split(' ')[1], secret) as jwt.JwtPayload;

        if(!data.adminId) throw new AuthorizationError('Not an admin');

        res.locals.adminId = data.adminId;
        res.locals.skipVerif = true;

        next();
    } catch (err) {
        errorHandler(err, res);
    }
}

export const verifyUserToken: RequestHandler = (req, res, next) => {
    const secret = process.env.JWT_SECRET!;

    if (res.locals.skipVerif || res.locals.skipUserVerif) return next();

    const { authorization } = req.headers;
        
    try {
        if (!authorization) throw new AuthenticationError('Invalid authentication');

        const data = jwt.verify(authorization.split(' ')[1], secret) as jwt.JwtPayload;

        if(!data.userId) throw new AuthorizationError('Not a user');

        res.locals.userId = data.userId;
        res.locals.skipVerif = true; 

        next();    
    } catch (err) {
        errorHandler(err, res);
    }
}

export const checkGetCarRole: RequestHandler = (req, res, next) => {
    const { as } = req.query;

    if (['super', 'admin'].includes(as as string) ) {
        switch (as) {
            case 'admin':
                res.locals.skipSuperAdminVerif = true;
                break;
            case 'super':
                res.locals.skipAdminVerif = true;
                break;
        }
        return next();
    }

    res.locals.skipVerif = true;
    next();
}

export const checkGetUserByIdRole: RequestHandler = (req, res, next) => {
    const { userId } = req.params;

    switch (userId) {
        case 'current':
            res.locals.skipAdminVerif = true
            break;
    

        default:
            res.locals.skipUserVerif = true;
            break;
    }

    next();
}