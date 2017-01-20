import Joi from 'joi'

function objectId() {
  return Joi.string().regex(/^[0-9a-fA-F]{24}$/)
}

export default {
  create: {
    body: {
      address: Joi.object({
        unit: Joi.string().lowercase().optional(),
        house: Joi.string().lowercase().required(),
        street: Joi.string().lowercase().required(),
      }).with('unit', ['house', 'street']).required(),
    },
  },

  show: {
    params: {
      id: objectId(),
    },
  },

  remove: {
    params: {
      id: objectId(),
    },
  },

  listAdditions: {
    params: {
      id: objectId(),
    },
  },

  createAddition: {
    body: {
      order: {
        id: Joi.string().required(),
      },
      // delivery: Joi.boolean().required(),
      carts: Joi.array().items(Joi.object({
        type: Joi.string().valid('garbage', 'recycling', 'organics'),
        size: Joi.number().valid(80, 120, 180, 240, 360),
      })).min(1).required(),
    },
    params: {
      id: objectId(),
    },
  },
}
