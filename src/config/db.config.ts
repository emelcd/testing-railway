import { connect } from 'mongoose'
import 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI as string

connect(MONGO_URI, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Connected to MongoDB')
  }
})
