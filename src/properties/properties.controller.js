import { OK, NOT_FOUND, CREATED, CONFLICT, UNPROCESSABLE_ENTITY } from 'http-status'

import { APIError } from '../utils/APIError'
import Tempest from '../utils/tempest'
import Cityworks from '../utils/cityworks'
import Property from './properties.model'
import Cart from '../carts/carts.model'
import Addition from '../additions/additions.model'

async function load(req, res, next) {
  try {
    const { id } = req.params
    const property = await Property.findById(id).populate('carts')
    if (!property) {
      next(new APIError('Property Not Found', NOT_FOUND))
      return
    }

    req.property = property // eslint-disable-line
    next()
  } catch (err) {
    next(err)
  }
}

async function list(req, res, next) {
  try {
    const properties = await Property.find({})

    res.status(OK).json(properties)
  } catch (err) {
    next(err)
  }
}

async function create(req, res, next) {
  // check if property already exists
  const { address } = req.body
  const existingProperty = await Property.findOne({
    'address.unit': address.unit,
    'address.house': address.house,
    'address.street': address.street,
  })
  if (existingProperty) {
    next(new APIError('Property Already Exists', CONFLICT))
    return
  }

  // find property in tempest-api
  let tempestProperty
  try {
    tempestProperty = await Tempest.findProperty({ address })
    if (!tempestProperty) {
      next(new APIError('Property Not Found', NOT_FOUND))
      return
    }
  } catch (err) {
    next(err)
    return
  }

  // check if available for garbage
  if (!tempestProperty.services.garbage.length) {
    next(new APIError('Property Not Available For Garbage', UNPROCESSABLE_ENTITY))
    return
  }

  try {
    // create property model
    const property = new Property({ address, tempestId: tempestProperty.id })

    // TODO: find out property type
    // TODO: initialize inventory based on property type
    const recyclingCart = new Cart({
      type: 'recycling',
      size: 240,
      status: 'available',
    })
    await recyclingCart.save()

    const organicsCart = new Cart({
      type: 'organics',
      size: 240,
      status: 'available',
    })
    await organicsCart.save()

    property.carts.push(recyclingCart._id, organicsCart._id) // eslint-disable-line
    await property.save()

    const savedProperty = await Property.findById(property._id).populate('carts') // eslint-disable-line

    res.status(CREATED).json(savedProperty)
  } catch (err) {
    next(err)
  }
}

async function show(req, res, next) {
  try {
    const { property } = req

    res.status(OK).json(property)
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    const { property } = req

    await property.remove()

    res.status(OK).json({})
  } catch (err) {
    next(err)
  }
}

async function listAdditions(req, res, next) {
  try {
    const { id } = req.params
    const additions = await Addition.find({ property: id }).populate('carts')

    res.status(OK).json(additions)
  } catch (err) {
    next(err)
  }
}

async function createAddition(req, res, next) {
  try {
    const { property } = req
    // TODO: validate addition with inventory

    // add carts to inventory with status 'in-progress'
    const cartsWithStatus = req.body.carts.map(x => ({ ...x, status: 'in-progress' }))

    // create service request in cityworks
    const serviceRequest = await Cityworks.createAddition({ carts: cartsWithStatus })

    // save carts
    const carts = await Cart.create(cartsWithStatus)

    // update property
    property.carts = [...property.carts, ...carts]
    await property.save()

    // save addition
    const addition = new Addition({
      property: property._id, // eslint-disable-line
      carts: carts.map(x => x._id), // eslint-disable-line
      cityworksId: serviceRequest.Value.RequestId,
    })
    await addition.save()

    res.status(CREATED).json(addition)
  } catch (err) {
    next(err)
  }
}

export default { list, create, show, remove, load, listAdditions, createAddition }
