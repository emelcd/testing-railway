import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import apiRouter from './routes'
import helmet from 'helmet'
import listEndpoints from 'express-list-endpoints'

const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())

app.use('/api', apiRouter)
app.get('/', (req, res) => res.send(listEndpoints(app)))

export default app
