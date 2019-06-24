'use strict'

const winston = require('winston')

const routes = require('../routes')
const {
  getCurrentDate
} = require('../util')

module.exports = (app) => new Promise((resolve, reject) => {
  try {
    routes(app)
    winston.info(`[${getCurrentDate()}][SETUP] Routes have been setup.`)

    resolve(app)
  } catch (err) {
    reject(err)
  }
})
