import express, { Application } from 'express'
const app:Application = express()

app.get('/', (req, res) => {
  res.send('Hello welcome to the grocery-shop!')
})


export default app;

