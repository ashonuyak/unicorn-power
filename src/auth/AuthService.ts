import { Injectable } from '@nestjs/common'

import { BcryptService } from 'src/bcrypt'
import { AuthDto, TokensDto } from 'src/dto'
import { TokensService } from 'src/token'
import { UserService } from 'src/user'
import { ValidationException, WrongCredentialsException } from './exceptions'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly tokensService: TokensService
  ) {}

  async signIn(dto: AuthDto.Sign): Promise<TokensDto.GetTokens> {
    const user = await this.userService.get(dto.accountId)

    let isValidPass: boolean
    if (!user) {
      isValidPass = false
    } else isValidPass = await this.bcryptService.compare(dto.password, user.password)

    if (!isValidPass) throw new WrongCredentialsException()

    return this.tokensService.getTokens(dto.accountId)
  }

  async signUp(dto: AuthDto.Sign): Promise<TokensDto.GetTokens> {
    let idType
    if (new RegExp('^[+]{0,1}380([0-9]{9})$').test(dto.accountId)) {
      idType = 'phone'
    } else if (
      new RegExp(
        '^(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])$'
      ).test(dto.accountId)
    ) {
      idType = 'email'
    } else throw new ValidationException()

    const passwordHash = await this.bcryptService.hash(dto.password)

    await this.userService.create({
      account_id: dto.accountId,
      password: passwordHash,
      id_type: idType,
    })

    return this.tokensService.getTokens(dto.accountId)
  }

  logOut(all: boolean, accountId: string): void {
    return this.tokensService.disableTokens(accountId, all)
  }

  async refreshTokens(refreshToken: string): Promise<TokensDto.GetTokens> {
    const { sub } = await this.tokensService.verifyRefreshToken(refreshToken)
    return this.tokensService.getTokens(sub)
  }
}
