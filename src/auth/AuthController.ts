import { Body, Controller, Get, Headers, Param, Post, UseGuards } from '@nestjs/common'
import { AuthDto, TokensDto } from 'src/dto'
import { AuthGuard } from 'src/guards'
import { AuthService } from './AuthService'
import { SignPipe } from './pipes/SignPipe'

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('signup')
  async signUp(@Body(SignPipe) dto: AuthDto.Sign): Promise<TokensDto.GetTokens> {
    try {
      const response = await this.service.signUp(dto)
      return response
    } catch (err) {
      throw err
    }
  }

  @Post('signin')
  async signIn(@Body(SignPipe) dto: AuthDto.Sign): Promise<TokensDto.GetTokens> {
    try {
      const tokens = await this.service.signIn(dto)
      return tokens
    } catch (err) {
      throw err
    }
  }

  @Get('logout/:all')
  @UseGuards(AuthGuard)
  logOut(@Param() param: { all: boolean }, @Headers() headers: { authorization: string }): void {
    try {
      this.service.logOut(param.all, headers.authorization.split(' ')[1])
    } catch (err) {
      throw err
    }
  }

  @Get('refresh')
  async refresh(@Headers() headers: { authorization: string }): Promise<TokensDto.GetTokens> {
    try {
      const tokens = await this.service.refreshTokens(headers.authorization.split(' ')[1])
      return tokens
    } catch (err) {
      throw err
    }
  }
}
