'use strict'

import fs from 'fs'
import winston from 'winston'

export type Config = {
  admin_key: string,
  logger: winston.LoggerOptions
}

export const config: Config = {
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

export default config
