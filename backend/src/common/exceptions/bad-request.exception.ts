import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(msg?: string) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: msg,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
