import mongoose from 'mongoose'
import supertest from 'supertest-as-promised'

export const request = supertest('http://easy-ifta-api:8080')

export async function connect() {
  mongoose.Promise = global.Promise
  await mongoose.connect(process.env.MONGO_URL || 'mongodb://db/easy-ifta-api')
}

export async function disconnect() {
  await mongoose.connection.db.dropDatabase()
  await mongoose.connection.close()
}

export default request
