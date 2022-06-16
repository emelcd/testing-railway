import SetController from '../controllers/Set.controller'
import { Router } from 'express'
import jwtMiddleware from '../middlewares/jwt.middleware'

const setRouter = Router()

setRouter.get('/', jwtMiddleware, SetController.getAll)
setRouter.post('/', jwtMiddleware, SetController.create)
setRouter.delete('/', jwtMiddleware, SetController.delete)
setRouter.put('/', jwtMiddleware, SetController.update)
setRouter.get('/public', SetController.getPublicSets)

export default setRouter
