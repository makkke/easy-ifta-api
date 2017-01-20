import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import User from './users/users.model'

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) return done(err)
      if (!user) return done(null, false, { message: 'User Not Found' })

      if (!user.checkPassword(password)) {
        return done(null, false, { message: 'Password Invalid' })
      }

      return done(null, user)
    })
  },
))
