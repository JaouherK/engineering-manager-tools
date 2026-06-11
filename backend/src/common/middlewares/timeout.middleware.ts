import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TimeoutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set the timeout to 30 seconds
    req.setTimeout(30000, () => {
      const error = new Error('Request Timeout');
      error.name = 'RequestTimeoutError';
      next(error);
    });

    next();
  }
}
