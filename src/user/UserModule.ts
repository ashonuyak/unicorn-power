import { Module } from '@nestjs/common'
import { UserRepository } from './UserRepository'
import { UserService } from './UserService'
import { UserController } from './UserController'
import { TokensModule } from 'src/token'

@Module({
  imports: [TokensModule],
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
