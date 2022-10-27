import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TokensRepository } from './TokensRepository'

import { TokensService } from './TokensService'

@Module({
  imports: [JwtModule],
  providers: [TokensRepository, TokensService],
  exports: [TokensService],
})
export class TokensModule {}
