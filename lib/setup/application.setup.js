'use strict'

const path = require('path')

const express = require('express')
const winston = require('winston')

const {
  getCurrentDate
} = require('../util')

module.exports = (config) => new Promise((resolve, reject) => {
  try {
    const app = express()
    app.set('trust proxy')
    app.set('views', path.resolve(__dirname, '../../templates/'))
    winston.info(`[${getCurrentDate()}][SETUP] Application has been created.`)

    resolve(app)
  } catch (err) {
    reject(err)
  }
})
