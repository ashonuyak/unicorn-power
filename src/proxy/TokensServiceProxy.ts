import { Injectable } from '@nestjs/common'
import { TokensDto } from 'src/dto'
import { TokenExpiredException } from 'src/guards/exceptions'
import { TokensService } from 'src/token'
import { TokenExpiredError } from 'src/token/errors'

@Injectable()
export class TokensServiceProxy {
  private tokensService: TokensService

  constructor(tokensService: TokensService) {
    this.tokensService = tokensService
  }

  public async verifyRefreshToken(refreshToken: string): Promise<{ sub: string }> {
    try {
      const response = await this.tokensService.verifyRefreshToken(refreshToken)
      return { ...response }
    } catch (err) {
      if (err instanceof TokenExpiredError) throw new TokenExpiredException()
      throw err
    }
  }

  public async getTokens(accountId: string): Promise<TokensDto.GetTokens> {
    const tokens = await this.tokensService.getTokens(accountId)
    return tokens
  }

  public disableTokens(access_token: string, all: string): void {
    this.tokensService.disableTokens(access_token, all)
  }
}
