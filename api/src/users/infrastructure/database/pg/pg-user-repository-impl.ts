import { UserRepository } from '@/users/domain/user.repository'
import { Injectable } from '@nestjs/common'
import { DatabaseService } from '@/database/database.service'
import { User } from '@/users/domain/user.entity'
import { UserRow } from '@/users/infrastructure/database/pg/types/user.row'
import { UserMapper } from '@/users/infrastructure/database/pg/mapper/user.mapper'

@Injectable()
export class PgUserRepositoryImpl implements UserRepository {
  constructor(private readonly db: DatabaseService) {}

  private static readonly INSERT_USER_SQL: string = `INSERT INTO users (id, email, full_name, password_hash) VALUES ($1, $2, $3, $4 )`
  private static readonly SELECT_BY_ID_USER_SQL: string = `SELECT id, email, full_name, password_hash FROM users WHERE id = $1`
  private static readonly SELECT_BY_EMAIL_USER_SQL: string = `SELECT id, email, full_name, password_hash FROM users WHERE email = $1`

  async save(user: User): Promise<void> {
    const { id, email, full_name, password_hash } = UserMapper.toRow(user)
    await this.db.queryOne(PgUserRepositoryImpl.INSERT_USER_SQL, [
      id,
      email,
      full_name,
      password_hash,
    ])
  }

  async findById(id: string): Promise<User | null> {
    const userRow = await this.db.queryOne<UserRow>(PgUserRepositoryImpl.SELECT_BY_ID_USER_SQL, [
      id,
    ])

    return userRow ? UserMapper.toDomain(userRow) : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const userRow = await this.db.queryOne<UserRow>(PgUserRepositoryImpl.SELECT_BY_EMAIL_USER_SQL, [
      email,
    ])

    return userRow ? UserMapper.toDomain(userRow) : null
  }
}
