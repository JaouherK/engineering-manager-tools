import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(msg?: string) {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        error: msg || 'Forbidden resource',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
