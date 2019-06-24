'use strict'

const application = require('./application.setup')
const logger = require('./logger.setup')
const middleware = require('./middleware.setup')
const routes = require('./routes.setup')

module.exports = (config) => Promise.resolve(config)
  .then(logger)
  .then(application)
  .then(middleware.before)
  .then(routes)
  .then(middleware.after)
