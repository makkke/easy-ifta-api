import { Router } from 'express'
import mongoose from 'mongoose'
import doctor from 'doctor-zhivago'

// import taxReturns from './taxReturns/taxReturns.route'
// import auth from './auth/taxReturns.route'
// import users from './users/taxReturns.route'

const router = new Router()

// healthcheck
router.get('/', doctor({
  database: { type: 'mongo', instance: mongoose },
}))

// router.use('/taxReturns', taxReturns)
// router.use('/auth', auth)
// router.use('/users', users)

export default router
