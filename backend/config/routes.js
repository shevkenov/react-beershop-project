const authRoutes = require('../routes/auth')
const beerRoutes = require('../routes/beer')
const statsRoutes = require('../routes/stats')
const ordersRoutes = require('../routes/order')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/beer', beerRoutes)
  app.use('/stats', statsRoutes)
  app.use('/orders', ordersRoutes)
}
