import mongoose from 'mongoose'

import config from './config'
import app from './app'
import log from './utils/log'

// promisify mongoose
mongoose.Promise = global.Promise

// connect to mongo database
mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } })
mongoose.connection.on('error', () => {
  log.fatal('unable to connect to database')
})

app.listen(config.port, () => {
  const { port, env } = config
  log.info('api started', { port, env })
})

export default app
