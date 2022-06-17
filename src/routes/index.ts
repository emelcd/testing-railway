import userRouter from './User.route'
import setRoute from './Set.route'
import questionRouter from './Question.route'
import jwtMiddleware from '../middlewares/jwt.middleware'
import { Router } from 'express'

const apiRouter = Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/set', setRoute)
apiRouter.use('/question', jwtMiddleware, questionRouter)

export default apiRouter
