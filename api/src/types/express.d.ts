import * as express from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: import('@/auth/payloads/jwt.payload').JwtPayload
    }
  }
}
