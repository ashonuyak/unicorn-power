/* eslint-disable prettier/prettier */
import { Column, Entity, Index, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('User')
export class User {
  @PrimaryColumn({ default: uuid(), unique: true })
  id: string

  @Column()
  @Index('UNIQUE_ID', { unique: true })
  account_id: string

  @Column()
  password: string

  @Column()
  id_type: string

  constructor(data?: Omit<User, 'id'>) {
    if(data) {
      this.id = uuid(),
      this.account_id = data.account_id,
      this.password = data.password
      this.id_type = data.id_type
    }
  }
}