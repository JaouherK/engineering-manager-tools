import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const util = require('util');

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [req, res] = context.getArgs();
    const now = Date.now();

    return next.handle().pipe(
      tap((body) => {
        console.log(
          util.inspect(
            {
              message: `[${req.method}] ${req.url}`,
              context: {
                owner_id: req.user.userId,
                correlation_id: '',
                request: {
                  params: req.params,
                  query: req.query,
                  body: req.body,
                },
                response: {
                  status: res.statusCode,
                  body: 'body',
                },
              },
              level: res.statusCode,
              duration: `${Date.now() - now}ms`,
              datetime: now,
              application: process.env.npm_package_name,
            },
            { showHidden: false, depth: null, colors: true },
          ),
        );
        console.log('------------------------------');
      }),
    );
  }
}
