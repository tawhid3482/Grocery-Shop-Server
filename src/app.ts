import express, { Application } from 'express'
import cors from 'cors'
import router from './app/routes'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// application
app.use('/', router)

app.get('/', (req, res) => {
  res.send('Hello welcome to the grocery-shop!')
})

export default app
