import { User } from './src/user'
import { ConnectionOptions } from 'typeorm'
import { Tokens } from 'src/token'

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL ?? 'postgres://localhost/test',
  entities: [User, Tokens],
  synchronize: true,
  migrations: ['./migrations/**/*.ts'],
  cli: {
    migrationsDir: './migrations',
  },
}

export = config
