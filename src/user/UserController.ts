import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { UserDto } from 'src/dto'
import { AuthGuard } from 'src/guards'
import { UserService } from './UserService'

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('info')
  @UseGuards(AuthGuard)
  async getInfo(@Request() req: any): Promise<UserDto.GetUser> {
    try {
      const user = await this.service.get(req.tokenPayload.sub)
      return { account_id: user.account_id, id_type: user.id_type }
    } catch (err) {
      throw err
    }
  }
}
