import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  address: {
    unit: String,
    house: String,
    street: String,
  },
  carts: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],

  tempestId: String,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

schema.set('toJSON', {
  transform: (doc, ret) => {
    /* eslint-disable no-param-reassign,no-underscore-dangle */
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

schema.pre('save', function save(next) {
  this.updatedAt = Date.now
  next()
})

export default mongoose.model('Property', schema)
