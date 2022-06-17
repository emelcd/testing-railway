import SetService from '../services/Set.service'
import { Request, Response } from 'express'
import { ApiErrorHandler } from '../utils/api.error'

class SetController {
  public static async getAll (req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body
      const sets = await SetService.getAll(email)
      return res.json(sets)
    } catch (error) {
      console.log(error)
      return ApiErrorHandler(error, res)
    }
  }

  public static async create (req: Request, res: Response): Promise<Response> {
    try {
      const set = await SetService.create({ ...req.body }, req.body.email)
      return res.json(set)
    } catch (error) {
      return ApiErrorHandler(error, res)
    }
  }

  public static async delete (req: Request, res: Response): Promise<Response> {
    try {
      const set = await SetService.delete(req.params.id, req.body.email)
      return res.json(set)
    } catch (error) {
      return ApiErrorHandler(error, res)
    }
  }

  public static async update (req: Request, res: Response): Promise<Response> {
    try {
      const set = await SetService.update(
        req.params.id,
        req.body,
        req.body.email
      )
      return res.json(set)
    } catch (error) {
      return ApiErrorHandler(error, res)
    }
  }

  public static async getPublicSets (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const sets = await SetService.getPublicSets()
      return res.json(sets)
    } catch (error) {
      return ApiErrorHandler(error, res)
    }
  }
}

export default SetController
