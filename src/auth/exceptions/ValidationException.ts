import { HttpStatus, HttpException } from '@nestjs/common'

export class ValidationException extends HttpException {
  constructor() {
    super('Validation error', HttpStatus.UNPROCESSABLE_ENTITY)
  }
}
