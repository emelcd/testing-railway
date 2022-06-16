import app from './server'
import './config/db.config'

app.listen(3000, () =>
  console.log('Server started on port http://localhost:3000')
)
