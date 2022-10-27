import { Injectable } from '@nestjs/common'

import { BcryptService } from 'src/bcrypt'
import { AuthDto, TokensDto } from 'src/dto'
import { TokensServiceProxy, UserServiceProxy } from 'src/proxy'
import { TokensService } from 'src/token'
import { UserService } from 'src/user'
import { IdTypeCheck, IdTypes } from './constants'
import { ValidationFailedError, WrongCredentialsError } from './errors'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly tokensService: TokensService,
    private readonly userServiceProxy: UserServiceProxy,
    private readonly tokensServiceProxy: TokensServiceProxy
  ) {}

  async signIn(dto: AuthDto.Sign): Promise<TokensDto.GetTokens> {
    const user = await this.userServiceProxy.get(dto.accountId)

    const isValidPass = await this.bcryptService.compare(dto.password, user.password)
    if (!isValidPass) throw new WrongCredentialsError()

    return this.tokensService.getTokens(dto.accountId)
  }

  async signUp(dto: AuthDto.Sign): Promise<TokensDto.GetTokens> {
    let idType
    if (new RegExp(IdTypeCheck.phone).test(dto.accountId)) {
      idType = IdTypes.phone
    } else if (new RegExp(IdTypeCheck.email).test(dto.accountId)) {
      idType = IdTypes.email
    } else throw new ValidationFailedError()

    const passwordHash = await this.bcryptService.hash(dto.password)

    await this.userService.create({
      account_id: dto.accountId,
      password: passwordHash,
      id_type: idType,
    })

    return this.tokensService.getTokens(dto.accountId)
  }

  logOut(all: string, accessToken: string): void {
    return this.tokensService.disableTokens(accessToken, all)
  }

  async refreshTokens(refreshToken: string): Promise<TokensDto.GetTokens> {
    const { sub } = await this.tokensServiceProxy.verifyRefreshToken(refreshToken)
    return this.tokensService.getTokens(sub)
  }
}
