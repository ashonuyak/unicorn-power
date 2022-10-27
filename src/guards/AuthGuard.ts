import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { TokenExpiredException } from './exceptions'
import { TokensService } from 'src/token'
import { TokenExpiredError } from 'src/token/errors'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokensService: TokensService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest()
      const token = request.header('Authorization').split(' ')[1]
      const tokenPayload = await this.tokensService.verifyAccessToken(token)
      request.tokenPayload = tokenPayload
      return true
    } catch (err) {
      if (err instanceof TokenExpiredError) throw new TokenExpiredException()
      throw err
    }
  }
}
