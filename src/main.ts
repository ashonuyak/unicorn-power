import { NestFactory } from '@nestjs/core'

import { AppModule } from './AppModule'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  await app.listen(process.env.PORT || 3002)
}
bootstrap()
