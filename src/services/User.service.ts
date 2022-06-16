import { UserModel } from '../models/User.model'
import { SHA512 } from 'crypto-js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { ApiError } from '../utils/api.error'
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export class UserService {
  public static async login (
    email: string,
    password: string
  ): Promise<
    | {
      token: string;
      email: string;
      username: string;
      avatar: string;
    }
    | Error
    > {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new ApiError('User not found', 404)
    }
    const hash = SHA512(password).toString()
    if (user.password !== hash) {
      throw new ApiError('Invalid password', 401)
    }
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '72h' })
    const parsedUser: {
      email: string;
      username: string;
      avatar: string;
      _id: string;
    } = {
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      _id: user._id.toString()
    }

    return { token, ...parsedUser }
  }

  public static async register (
    email: string,
    password: string
  ): Promise<
    | {
      token: string;
      email: string;
      username: string;
      avatar: string;
    }
    | Error
    > {
    const user = await UserModel.findOne({ email })
    if (user) {
      throw new ApiError('User already exists', 409)
    }
    const hash = SHA512(password).toString()
    const newUser = new UserModel({
      email,
      password: hash
    })
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '72h' })
    await newUser.save()
    const newUserFind = await UserModel.findOne({ email })
    if (!newUserFind) {
      return new ApiError('User not found', 404)
    }

    return {
      token,
      email: newUserFind.email,
      username: newUserFind.username,
      avatar: newUserFind.avatar
    }
  }
}
