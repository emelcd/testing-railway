import QuestionController from '../controllers/Question.controller'
import { Router } from 'express'
import jwtMiddleware from '../middlewares/jwt.middleware'

const questionRouter = Router()

questionRouter.post('/:set', jwtMiddleware, QuestionController.create)

export default questionRouter
