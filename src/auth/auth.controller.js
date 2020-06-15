import { NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status'
import passport from 'passport'

import User from '../users/users.model'

const signup = (req, res) => {
  const user = new User(req.body)

  try {
    await user.setPassword(req.body.password)
    const savedUser = await user.save()
    res.status(httpStatus.CREATED).json(savedUser)
  } catch (err) {
    next(err)
  }

  const token = user.generateJwt()
  res.json({ token })
}

const login = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.status(NOT_FOUND).json(err)
      return
    }

    if (!user) {
      res.status(httpStatus.UNAUTHORIZED).json(info)
      return
    }

    const token = user.generateJwt()
    res.status(httpStatus.OK).json({
      token,
    })
  })(req, res)
}

export default { signup, login }
