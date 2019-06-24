'use strict'

const fs = require('fs')

const winston = require('winston')

module.exports = {
  admin_key: fs.readFileSync('/var/chat.key', 'utf-8'),
  logger: {
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.colorize()
    )
  }
}
