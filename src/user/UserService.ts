import { Injectable, HttpException } from '@nestjs/common'
import { UserDto } from 'src/dto'
import { NotUnique } from 'src/utils/errors'
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
      if (error instanceof NotUnique) {
        throw new NotUniqueException()
      }
      throw error
    }
  }

  async get(accountId: string): Promise<UserDto.User> {
    const user = await this.repository.findOne({ account_id: accountId })
    if (!user) throw new HttpException('User does not exist', 400)
    return user
  }
}
