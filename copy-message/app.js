require('dotenv').config()
require('./src/utils/database')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { logger } = require('./src/utils')
const { errorHandler } = require('./src/middlewares')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cors
app.use(cors())

// log HTTP requests
app.use(morgan('dev'))

app.use('/', require('./src/routes'))

// Catch 404
app.use((_req, res) => {
    res.status(404).send({
        error: 'Invaid Route',
    })
})

// global error handler
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    logger.info(`server is running on port ${PORT}`)
})
