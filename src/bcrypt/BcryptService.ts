import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import bcrypt from 'bcrypt'

@Injectable()
export class BcryptService {
  constructor(private readonly configService: ConfigService) {}
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.configService.get('BCRYPT_SALT_ROUNDS') || 10)
  }

  compare(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash)
  }
}
