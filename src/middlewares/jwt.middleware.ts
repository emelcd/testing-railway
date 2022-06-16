import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

interface IJWTDecoded {
  email: string;
  iat: number;
  exp: number;
}

const extractEmailFromToken = (token: string) => {
  const decoded = jwt.decode(token) as IJWTDecoded
  return decoded?.email
}

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  try {
    if (!token) {
      return res.status(401).json({
        error: 'No token provided'
      })
    }
    const email = extractEmailFromToken(token)
    if (!email) {
      return res.status(401).json({
        error: 'Invalid token'
      })
    }
    req.body.email = email
    next()
  } catch (err) {
    return res.status(401).json({
      error: 'Unable to authenticate'
    })
  }
}

export default jwtMiddleware
