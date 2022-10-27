import { Injectable, PipeTransform } from '@nestjs/common'
import { AuthDto } from 'src/dto'
import { ValidationException } from '../exceptions'

@Injectable()
export class SignPipe implements PipeTransform {
  transform(value: AuthDto.Sign): AuthDto.Sign {
    if (!value.accountId || !value.password) throw new ValidationException()
    return value
  }
}
