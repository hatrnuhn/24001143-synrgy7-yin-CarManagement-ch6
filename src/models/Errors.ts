import { TokenExpiredError, JsonWebTokenError, NotBeforeError } from 'jsonwebtoken';

export class AuthorizationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AutorizationError'
    }
}

export class BadRequestBodyError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadRequestBodyError'
    }
}

export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AutorizationError'
    }
}

export type JwtError = TokenExpiredError | JsonWebTokenError | NotBeforeError | AuthorizationError;
