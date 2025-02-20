import express, { Application } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './app/routes'
const app: Application = express()

// parser
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:['http://localhost:5173']}))

// application
app.use('/', router)

app.get('/', (req, res) => {
  res.send('Hello welcome to the grocery-shop!')
})

export default app
