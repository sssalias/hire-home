import { UserRow } from '@/users/infrastructure/database/pg/types/user.row'
import { User } from '@/users/domain/user.entity'

export class UserMapper {
  static toDomain(row: UserRow): User {
    const { id, email, full_name, password_hash } = row
    return User.restore(id, email, full_name, password_hash)
  }

  static toRow(domain: User): UserRow {
    const { id, email, fullName, passwordHash } = domain
    return {
      id: id,
      email: email,
      full_name: fullName,
      password_hash: passwordHash,
    }
  }
}
