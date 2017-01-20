import Express from 'express'
import bodyParser from 'body-parser'
import compress from 'compression'
import cors from 'cors'
import { NOT_FOUND } from 'http-status'
import expressValidation from 'express-validation'
import logger from 'express-bunyan-logger'
import helmet from 'helmet'

import routes from './routes'
import { APIValidationError, mapAPIErrorToJson, APIError } from './utils/APIError'
import './passport'

const app = new Express()

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compress())
app.use(cors())
app.use(logger())

// mount all routes
app.use('/', routes)

// if error is not an instanceOf APIError, convert it
// TODO: move to a module
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    const error = new APIValidationError(err.errors)

    return next(error)
  } else if (!(err instanceof APIError)) {
    req.log.warn(err)
    const apiError = new APIError(err.message, err.status)

    return next(apiError)
  }

  return next(err)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new APIError('Route Not Found', NOT_FOUND)

  return next(error)
})

// app.use((err, req, res, next) => {
//   if (err.name === 'UnauthorizedError') {
//     res.status(httpStatus.UNAUTHORIZED).json({ message: `${err.name}: ${err.message}` })
//     return
//   }
//
//   next()
// })

app.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status).json(mapAPIErrorToJson(err))
})

export default app
