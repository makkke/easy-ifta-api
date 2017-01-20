// import test from 'ava'
// import { OK, CREATED, CONFLICT, NOT_FOUND, UNPROCESSABLE_ENTITY } from 'http-status'
//
// import { request, connect, disconnect } from './utils'
//
// test.beforeEach(async () => await connect())
// test.afterEach.always(async () => await disconnect())

// // GET /properties
// test('list: should list properties', async (t) => {
//   t.plan(2)
//
//   let r = await request
//     .post('/properties')
//     .send({ address: { house: '9675', street: '116 st' } })
//
//   r = await request
//     .post('/properties')
//     .send({ address: { house: '10898', street: '160a st' } })
//
//   r = await request.get('/properties')
//   const properties = r.body
//
//   t.is(r.status, OK)
//   t.is(properties.length, 2)
// })
//
// // POST /properties
// test('create: should create property', async (t) => {
//   t.plan(5)
//
//   const address = { house: '9675', street: '116 st' }
//   const r = await request
//     .post('/properties')
//     .send({ address })
//   const property = r.body
//
//   t.is(r.status, CREATED)
//   t.true({}.hasOwnProperty.call(property, 'id'))
//   t.is(property.tempestId, '65362C100804090332850000')
//   t.true(Array.isArray(property.carts))
//   t.deepEqual(property.address, address)
// })
//
// test('create: should error if property already exists', async (t) => {
//   const address = { house: '9675', street: '116 st' }
//   let r = await request
//     .post('/properties')
//     .send({ address })
//
//   r = await request
//     .post('/properties')
//     .send({ address })
//
//   t.is(r.status, CONFLICT)
// })
//
// test('create: should error if property is not found', async (t) => {
//   const r = await request
//     .post('/properties')
//     .send({ address: { house: '112233', street: 'kukuevo' } })
//
//   t.is(r.status, NOT_FOUND)
// })
//
// test('create: should error if property is not available for garbage', async (t) => {
//   const address = { house: '1840', street: '160 st', unit: '188' }
//   const r = await request
//     .post('/properties')
//     .send({ address })
//
//   t.is(r.status, UNPROCESSABLE_ENTITY)
// })
//
// // GET /properties/:id
// test('show: should view property details', async (t) => {
//   t.plan(2)
//
//   const address = { house: '9675', street: '116 st' }
//   let r = await request
//     .post('/properties')
//     .send({ address })
//
//   const createdProperty = r.body
//   r = await request.get(`/properties/${createdProperty.id}`)
//   const property = r.body
//
//   t.is(r.status, OK)
//   t.deepEqual(property, createdProperty)
// })
//
// test('show: should error if property is not found', async (t) => {
//   const r = await request.get('/properties/111222333444555666777888')
//
//   t.is(r.status, NOT_FOUND)
// })
//
// // DELETE /properties/:id
// test('remove: should remove property by id', async (t) => {
//   const address = { house: '9675', street: '116 st' }
//   let r = await request
//     .post('/properties')
//     .send({ address })
//   const property = r.body
//
//   r = await request
//     .delete(`/properties/${property.id}`)
//
//   t.is(r.status, OK)
// })
//
// test('remove: should error if property is not found', async (t) => {
//   const r = await request.delete('/properties/111222333444555666777888')
//
//   t.is(r.status, NOT_FOUND)
// })
