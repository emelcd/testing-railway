import UserController from '../controllers/User.controller'
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/login', UserController.login)

userRouter.post('/register', UserController.register)

export default userRouter
