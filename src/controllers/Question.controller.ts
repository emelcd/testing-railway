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

  public static async update (req: Request, res: Response): Promise<Response> {
    try {
      const question = await QuestionService.update(
        req.body,
        req.params.set,
        req.params.id,
        req.body.email
      )
      return res.status(200).json(question)
    } catch (error) {
      console.log(error)
      return ApiErrorHandler(error, res)
    }
  }

  public static async delete (req: Request, res: Response): Promise<Response> {
    try {
      const question = await QuestionService.delete(
        req.params.id,
        req.params.set,
        req.body.email
      )
      return res.status(200).json(question)
    } catch (error) {
      console.log(error)
      return ApiErrorHandler(error, res)
    }
  }
}

export default QuestionController
