import { Injectable } from '@nestjs/common'
import { UserDto } from 'src/dto'
import { NotUniqueError } from 'src/utils/errors'
import { UserNotFoundError } from './errors'
import { NotUniqueException } from './exceptions'

import { User } from './User'
import { UserRepository } from './UserRepository'

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(dto: UserDto.CreateUser): Promise<void> {
    try {
      const user = new User(dto)
      await this.repository.save(user)
    } catch (error) {
      if (error instanceof NotUniqueError) {
        throw new NotUniqueException()
      }
      throw error
    }
  }

  async get(accountId: string): Promise<UserDto.User> {
    const user = await this.repository.findOne({ account_id: accountId })
    if (!user) throw new UserNotFoundError()
    return user
  }
}
