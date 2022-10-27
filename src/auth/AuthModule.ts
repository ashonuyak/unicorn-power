import { Module } from '@nestjs/common'
import { BcryptModule } from 'src/bcrypt'
import { TokensModule } from 'src/token'
import { UserModule } from 'src/user'
import { AuthController } from './AuthController'
import { AuthService } from './AuthService'

@Module({
  imports: [UserModule, BcryptModule, TokensModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
