import QuestionController from '../controllers/Question.controller'
import { Router } from 'express'

const questionRouter = Router()

questionRouter.post('/:set', QuestionController.create)
questionRouter.put('/:set', QuestionController.update)
questionRouter.delete('/:set/:id', QuestionController.delete)

export default questionRouter
