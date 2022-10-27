import { getManager } from 'typeorm'

import { Repository } from 'src/utils'
import { Tokens } from './Tokens'

export class TokensRepository extends Repository<Tokens>(Tokens) {
  disableAccessToken(access_token: string, em = getManager()): void {
    em.createQueryBuilder()
      .update(Tokens)
      .set({ access_token: 'invalid' })
      .where('access_token = :access_token', { access_token })
      .execute()
  }

  disableRefreshToken(access_token: string, em = getManager()): void {
    em.createQueryBuilder()
      .delete()
      .from(Tokens)
      .where('access_token = :access_token', { access_token })
      .execute()
  }
}
