import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth'
import AppError from '../errors/AppError'


interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void | Response {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(400).json("JWT token não existente");
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub, iat, exp } = decoded as TokenPayload;

        request.user = {
            id: sub
        }

        return next();
    } catch (err) {
        return response.status(400).json("JWT token inválido");
    }

}
