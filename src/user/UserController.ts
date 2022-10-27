import { Controller, Get, HttpException, Request, UseGuards } from '@nestjs/common'
import { UserDto } from 'src/dto'
import { AuthGuard } from 'src/guards'
import { UserNotFoundError } from './errors'
import { UserService } from './UserService'

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('info')
  @UseGuards(AuthGuard)
  async getInfo(@Request() req: any): Promise<UserDto.GetUser> {
    try {
      const user = await this.service.get(req.tokenPayload.sub)
      return { account_id: user.account_id, id_type: user.id_type }
    } catch (err) {
      if (err instanceof UserNotFoundError) throw new HttpException('User does not exist', 400)
      throw err
    }
  }
}
