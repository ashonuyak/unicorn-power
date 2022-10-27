import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { TokensDto } from 'src/dto'
import { TokenExpiredException } from 'src/guards/exceptions'
import { TokenExpiredError } from './errors'
import { Tokens } from './Tokens'
import { TokensRepository } from './TokensRepository'

@Injectable()
export class TokensService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly repository: TokensRepository
  ) {}

  getAccessToken(accountId: string): string {
    return this.jwtService.sign(
      {
        sub: accountId,
        exp: Math.floor(Date.now() / 1000) + Number(this.configService.get('ACCESS_TTL')),
      },
      { secret: this.configService.get('JWT_SECRET') }
    )
  }

  getRefreshToken(accountId: string): string {
    return this.jwtService.sign(
      {
        sub: accountId,
        exp: Math.floor(Date.now() / 1000) + Number(this.configService.get('REFRESH_TTL')),
      },
      { secret: this.configService.get('JWT_SECRET_REFRESH') }
    )
  }

  async verifyAccessToken(token: string): Promise<{ sub: string }> {
    const accessToken = await this.repository.findOne({ access_token: token })
    if (!accessToken) throw new TokenExpiredError()

    return this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET') })
  }

  async verifyRefreshToken(token: string): Promise<{ sub: string }> {
    const tokens = await this.repository.findOne({ refresh_token: token })
    if (!tokens) throw new TokenExpiredError()
    this.repository.disableRefreshToken(tokens.access_token)

    return this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET_REFRESH') })
  }

  async getTokens(accountId: string): Promise<TokensDto.GetTokens> {
    const accessToken = this.getAccessToken(accountId)
    const refreshToken = this.getRefreshToken(accountId)

    const tokens = new Tokens({ access_token: accessToken, refresh_token: refreshToken })
    console.log(tokens)
    const alo = await this.repository.save(tokens)
    console.log(alo)

    return { access_token: accessToken, refresh_token: refreshToken }
  }

  disableTokens(access_token: string, all: string): void {
    if (all === 'true') return this.repository.disableRefreshToken(access_token)
    return this.repository.disableAccessToken(access_token)
  }
}
