import QuestionController from '../controllers/Question.controller'
import { Router } from 'express'
import jwtMiddleware from '../middlewares/jwt.middleware'

const questionRouter = Router()

questionRouter.post('/:set', jwtMiddleware, QuestionController.create)
questionRouter.put('/:set', jwtMiddleware, QuestionController.update)
questionRouter.delete('/:set/:id', jwtMiddleware, QuestionController.delete)

export default questionRouter
