import { Body, Controller, Get, Headers, Param, Post, UseGuards } from '@nestjs/common'
import { AuthDto, TokensDto } from 'src/dto'
import { AuthGuard } from 'src/guards'
import { TokenExpiredException } from 'src/guards/exceptions'
import { TokenExpiredError } from 'src/token/errors'
import { AuthService } from './AuthService'
import { NotFoundError, ValidationFailedError, WrongCredentialsError } from './errors'
import {
  NotFoundException,
  ValidationFailedException,
  WrongCredentialsException,
} from './exceptions'
import { SignPipe } from './pipes/SignPipe'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('signup')
  async signUp(@Body(SignPipe) dto: AuthDto.Sign): Promise<TokensDto.GetTokens> {
    try {
      const response = await this.service.signUp(dto)
      return response
    } catch (err) {
      if (err instanceof ValidationFailedError) throw new ValidationFailedException()
      throw err
    }
  }

  @Post('signin')
  async signIn(@Body(SignPipe) dto: AuthDto.Sign): Promise<TokensDto.GetTokens> {
    try {
      const tokens = await this.service.signIn(dto)
      return tokens
    } catch (err) {
      if (err instanceof NotFoundError) throw new NotFoundException()
      if (err instanceof WrongCredentialsError) throw new WrongCredentialsException()
      throw err
    }
  }

  @Get('logout/:all')
  @UseGuards(AuthGuard)
  logOut(@Param() param: { all: string }, @Headers() headers: { authorization: string }): void {
    this.service.logOut(param.all, headers.authorization.split(' ')[1])
  }

  @Get('refresh')
  async refresh(@Headers() headers: { authorization: string }): Promise<TokensDto.GetTokens> {
    try {
      const tokens = await this.service.refreshTokens(headers.authorization.split(' ')[1])
      return tokens
    } catch (err) {
      if (err instanceof TokenExpiredError) throw new TokenExpiredException()
      throw err
    }
  }
}
