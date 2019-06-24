'use strict'

const base = require('./base.page')
const socket = require('./socket')

module.exports = (app) => {
  app.ws('/socket', socket)
  app.get('/*', base)
}
