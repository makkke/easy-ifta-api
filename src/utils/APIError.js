import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status'

import config from '../config'

function mapJoiErrors(errors) {
  let unifiedError = {}
  errors.forEach((error) => {
    unifiedError = { ...unifiedError, [error.field]: error.types.map(x => x.split('.').pop()) }
  })

  return unifiedError
}


export class APIError extends Error {
  constructor(message, status = INTERNAL_SERVER_ERROR) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.status = status
    Error.captureStackTrace(this, this.constructor.name)
  }
}

export class APIValidationError extends Error {
  constructor(joiErrors) {
    super()
    this.errors = mapJoiErrors(joiErrors)
    this.message = 'Validation Failed'
    this.status = BAD_REQUEST
  }
}

export function mapAPIErrorToJson(apiError) {
  const json = {
    message: apiError.message,
    errors: apiError.errors,
  }

  if (config.env !== 'production') {
    json.stack = apiError.stack
  }


  return json
}

export default APIError
