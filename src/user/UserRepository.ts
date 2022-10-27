import { Repository } from 'src/utils'
import { User } from './User'

export class UserRepository extends Repository<User>(User) {}
