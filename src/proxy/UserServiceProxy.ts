import { Injectable } from '@nestjs/common'
import { NotFoundError } from 'src/auth/errors'
import { UserDto } from 'src/dto'
import { UserService } from 'src/user'
import { UserNotFoundError } from 'src/user/errors'

@Injectable()
export class UserServiceProxy {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  public async get(accountId: string): Promise<UserDto.User> {
    try {
      const user = await this.userService.get(accountId)
      return user
    } catch (err) {
      if (err instanceof UserNotFoundError) throw new NotFoundError()
      throw err
    }
  }

  public async create(dto: UserDto.CreateUser): Promise<void> {
    this.userService.create(dto)
  }
}
