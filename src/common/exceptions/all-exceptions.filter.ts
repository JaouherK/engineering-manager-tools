import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    let error, statusCode, message;

    console.log(exception.constructor);
    console.log('--------------------------');
    console.log(exception);

    if (exception instanceof HttpException) {
      error = exception.message;
      statusCode = exception.getStatus();
      message =
        exception.getResponse()['message'] !== exception.message
          ? exception.getResponse()['message']
          : null;
    } else if (exception instanceof QueryFailedError) {
      error = exception.message;
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof EntityNotFoundError) {
      error = exception.message;
      statusCode = HttpStatus.NOT_FOUND;
    }

    const responseBody = {
      statusCode,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
