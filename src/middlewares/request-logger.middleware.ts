import { Request, Response, NextFunction } from 'express';

export const requestLoggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const startTime = new Date().getTime();

    res.on('finish', () => {
        const endTime = new Date().getTime();
        const duration = endTime - startTime;

        console.log(
            `${req.method} :: ${req.originalUrl} :: ${res.statusCode} :: ${duration}ms`,
        );

        next();
    });
};
