'use strict'

const winston = require('winston')

const {
  getCurrentDate
} = require('../util')

module.exports = (config) => new Promise((resolve, reject) => {
  try {
    winston.configure(config.logger)
    winston.info(`[${getCurrentDate()}][SETUP] Logger has been configured.`)

    resolve(config)
  } catch (err) {
    reject(err)
  }
})
