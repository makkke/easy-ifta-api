import { Router } from 'express'
import validate from 'express-validation'

import {
  list, create, show, remove, load,
  listAdditions, createAddition,
} from './properties.controller'
import validator from './properties.validator'

const router = new Router()

router.route('/')
  .get(list)
  .post(validate(validator.create), create)

router.route('/:id')
  .get(validate(validator.show), load, show)
  .delete(validate(validator.remove), load, remove)

router.route('/:id/additions')
  .get(validate(validator.listAdditions), listAdditions)
  .post(validate(validator.createAddition), load, createAddition)

export default router
