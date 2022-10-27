import { HttpStatus, HttpException } from '@nestjs/common'

export class NotUniqueException extends HttpException {
  constructor() {
    super('User with this phone or email already exists', HttpStatus.CONFLICT)
  }
}
