import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { PG_POOL } from '@/database/database.constants'
import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg'

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

  public async query<T extends QueryResultRow = QueryResultRow>(
    sql: string,
    values?: unknown[],
  ): Promise<QueryResult<T>> {
    return await this.pool.query<T>(sql, values)
  }

  public async transaction<T>(cb: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect()

    try {
      await client.query('BEGIN')

      const result = await cb(client)

      await client.query('COMMIT')

      return result
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  }
}
