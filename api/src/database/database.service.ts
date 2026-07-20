import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { PG_POOL } from '@/database/database.constants'
import { Pool, QueryResult, QueryResultRow } from 'pg'

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  public async onModuleInit(): Promise<void> {
    try {
      await this.isAlive()
      console.log(`[POOL] Database connection successful`)
    } catch (error) {
      throw new Error(`[POOL] Database connection failed! Reason ${error}`)
    }
  }

  private async isAlive() {
    await this.queryOne<any>(`SELECT 1`)
  }

  public async queryOne<T extends QueryResultRow = QueryResultRow>(
    sql: string,
    values?: unknown[],
  ): Promise<T | null> {
    const result = await this.pool.query<T>(sql, values)

    return result.rows[0] ?? null
  }

  public query<T extends QueryResultRow = QueryResultRow>(
    sql: string,
    values?: unknown[],
  ): Promise<QueryResult<T>> {
    return this.pool.query<T>(sql, values)
  }
}
