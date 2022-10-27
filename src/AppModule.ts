import { CacheModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { UserModule } from './user'
import { config } from './config'
import { DatabaseConfig } from './database.config'
import { AuthModule } from './auth'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    CacheModule.register(),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
