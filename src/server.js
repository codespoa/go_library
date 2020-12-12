require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongo = require('./config/mongo')

const { HOST, PORT } = process.env

const port = PORT || 3333

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

require('./shared/infra/http/routes')(app)

mongo.connect()

app.use((request, response, next) => {
  const err = new Error('Route not found')
  err.status = 404
  next(err)
})

app.use((err, request, response, next) => {
  if (err) {
    console.log(err)
    return response.status(err.statusCode || 500).json({
      code: err.statusCode || 500,
      message: err.message || 'Internal server Error',
    })
  }

  next()
})

app.listen(port, () => {
  console.log('\x1b[32m', `[API] Server is running on ${HOST}:${port}`)
})