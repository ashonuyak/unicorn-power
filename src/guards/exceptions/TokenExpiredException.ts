import { HttpStatus, HttpException } from '@nestjs/common'

export class TokenExpiredException extends HttpException {
  constructor() {
    super('The token expired', HttpStatus.UNAUTHORIZED)
  }
}
