'use strict'

const path = require('path')

const express = require('express')
const expressnunjucks = require('express-nunjucks')
const expressws = require('express-ws')
const helmet = require('helmet')
const staticify = require('staticify')(path.join(__dirname, '../../static'))
const winston = require('winston')

const {
  getCurrentDate
} = require('../util')

module.exports = {
  before: (app) => new Promise((resolve, reject) => {
    try {
      app.use(helmet())
      expressws(app)
      expressnunjucks(app)
      app.use('/static', staticify.middleware, express.static(path.resolve(__dirname, '../../static/')))
      app.use((req, res, next) => {
        let oldEnd = res.end
        res.end = function () {
          winston.info(`[${getCurrentDate()}][${req.method}][${req.headers['x-forwarded-for'] || req.ip}] - ${req.path} => ${res.statusCode}`)
          return oldEnd.apply(this, arguments)
        }
        next()
      })
      winston.info(`[${getCurrentDate()}][SETUP] Before route middleware has been setup.`)

      resolve(app)
    } catch (err) {
      reject(err)
    }
  }),
  after: (app) => new Promise((resolve, reject) => {
    try {
      winston.info(`[${getCurrentDate()}][SETUP] After route middleware has been setup.`)
      resolve(app)
    } catch (err) {
      reject(err)
    }
  })
}
