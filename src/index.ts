import app from './server'
import './config/db.config'
import 'dotenv/config'

const PORT = process.env.PORT

app.listen(PORT, () =>
  console.log('Server started on port http://localhost:3000')
)
