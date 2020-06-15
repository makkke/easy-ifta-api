import { Router } from 'express'
import validate from 'express-validation'

import { signup, login } from './auth.controller'
import validator from './auth.validator'

const router = new Router()

router.route('/signup')
  .post(validate(validator.signup), signup)

router.route('/login')
  .post(validate(validator.login), login)

export default router
