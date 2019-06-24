'use strict'

if(process.argv[2] === 'dev') {
  process.env.NODE_ENV = 'development'
}

const winston = require('winston')

const config = require('./app.config')
const chitter = require('./lib')

chitter.setup(config).then(app => {
  app.listen(8080, function() {
    winston.info(`[${chitter.util.getCurrentDate()}][SETUP] Application has started on ${this.address().port}`)
  })
}).catch(err => {
  winston.error(err)
})
