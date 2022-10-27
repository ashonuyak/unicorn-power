import { Module } from '@nestjs/common'

import { BcryptService } from './BcryptService'

@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
