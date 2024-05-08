import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const allowedOrigins = ['http://localhost:4200', 'https://front-my-app-dons.vercel.app/home'];



@Injectable()
export class CorsMiddlewareService implements NestMiddleware {



    use(req: Request, res: Response, next: NextFunction) {
        const origin = req.headers.origin as string;

        if (allowedOrigins.includes(origin)) {
            res.header('Access-Control-Allow-Origin', origin);
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        }
        next();
    }
}