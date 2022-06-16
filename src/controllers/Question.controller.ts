import QuestionService from '../services/Question.service'
import { Request, Response } from 'express'
import { ApiErrorHandler } from '../utils/api.error'

class QuestionController {
  public static async create (req: Request, res: Response): Promise<Response> {
    try {
      const question = await QuestionService.create(
        req.body,
        req.params.set,
        req.body.email
      )
      return res.status(201).json(question)
    } catch (error) {
      console.log(error)
      return ApiErrorHandler(error, res)
    }
  }
}

export default QuestionController
