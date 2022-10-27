export interface CreateUser {
  account_id: string
  password: string
  id_type: string
}

export type GetUser = Omit<CreateUser, 'password'>

export interface User extends CreateUser {
  id: string
}
