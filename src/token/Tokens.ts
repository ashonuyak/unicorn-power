/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, Index, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('Tokens')
export class Tokens {
  @PrimaryColumn({ default: uuid(), unique: true })
  id: string

  @Column()
  @Index('UNIQUE_ACCESS', { unique: true })
  access_token: string

  @Column()
  refresh_token: string

  @CreateDateColumn()
  created_at: Date

  constructor(data?: Omit<Tokens, 'id' | 'created_at'>) {
    if(data) {
      this.id = uuid(),
      this.access_token = data.access_token,
      this.refresh_token = data.refresh_token
    }
  }
}