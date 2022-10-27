import { Module } from '@nestjs/common'
import { BcryptModule } from 'src/bcrypt'
import { TokensServiceProxy, UserServiceProxy } from 'src/proxy'
import { TokensModule } from 'src/token'
import { UserModule } from 'src/user'
import { AuthController } from './AuthController'
import { AuthService } from './AuthService'

@Module({
  imports: [UserModule, BcryptModule, TokensModule],
  providers: [AuthService, UserServiceProxy, TokensServiceProxy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
