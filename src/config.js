export default {
  env: process.env.NODE_ENV || 'production',
  port: process.env.PORT || 8080,
  ip: process.env.IP || '0.0.0.0',

  secrets: {
    jwt: process.env.JWT_SECRET || 'ilovejameswoods',
  },

  // Dependencies
  db: process.env.DB || 'mongodb://db/cart-inventory-api',
  'road-so-far-api': process.env.ROAD_SO_FAR || 'http://road-so-far-api:8080',
}
