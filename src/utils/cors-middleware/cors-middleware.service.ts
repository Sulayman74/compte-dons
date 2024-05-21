import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CorsMiddlewareService implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedOrigins = [
      'http://localhost:4200',
      'https://front-my-app-dons-gko83tmtz-sulayman74s-projects.vercel.app',
    ];
    const origin = req.headers.origin as string;

    let corsOptions;
    if (allowedOrigins.includes(origin)) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }

    res.setHeader(
      'Access-Control-Allow-Origin',
      corsOptions.origin ? origin : '*',
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  }
}
