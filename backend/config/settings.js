const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../'))

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost:27017/BeerShop',
    port: 5555
  },
  production: {
    port: process.env.PORT
  }
}
