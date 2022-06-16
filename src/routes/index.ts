import userRouter from './User.route'
import setRoute from './Set.route'
import questionRouter from './Question.route'

import { Router } from 'express'

const apiRouter = Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/set', setRoute)
apiRouter.use('/question', questionRouter)

export default apiRouter
