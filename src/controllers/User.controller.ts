import { Request, Response } from 'express'
import { UserService } from '../services/User.service'
import { ApiErrorHandler } from '../utils/api.error'

class UserController {
  public static async login (req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await UserService.login(email, password)
      res.status(200).json({
        client_data: user
      })
    } catch (err) {
      console.log(err)
      ApiErrorHandler(err, res)
    }
  }

  public static async register (req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await UserService.register(email, password)
      res.status(200).json({
        client_data: user
      })
    } catch (err) {
      console.log(err)
      ApiErrorHandler(err, res)
    }
  }
}

export default UserController
