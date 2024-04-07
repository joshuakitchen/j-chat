'use strict'

import express from 'express'
import expressWs, { Application } from 'express-ws'
import helmet from 'helmet'
import path from 'path'
import winston from 'winston'
import ViteExpress from 'vite-express'
import { setupRoutes } from './routes'
import config from './app.config'
import { getDateString } from './util'

export const app: express.Application | Application = express()

if(process.argv[2] === 'dev') {
  process.env.NODE_ENV = 'development'
}

function setupBeforeMiddleware(app: express.Application) {
  app.use(helmet())
  expressWs(app)
  app.use('/static', express.static(path.resolve(__dirname, '../../static/')))
}

async function main() {
  winston.configure(config.logger)
  winston.info(`[${getDateString()}][SETUP] Logger has been configured.`)

  app.set('trust proxy', 'loopback')
  app.set('views', path.resolve(__dirname, '../../templates/'))
  winston.info(`[${getDateString()}][SETUP] Application has been created.`)


  setupBeforeMiddleware(app)
  const wsApp = app as Application
  
  winston.info(`[${getDateString()}][SETUP] Before route middleware has been setup.`)
  setupRoutes(wsApp)

  winston.info(`[${getDateString()}][SETUP] After route middleware has been setup.`)
  
  const server = app.listen(8080, function _onAppCreated() {
    winston.info(`[${getDateString()}][SETUP] Application has started on ${8080}`)
  })

  ViteExpress.bind(app as express.Express, server)
}

main().catch(err => {
  winston.error(err);
  throw err;
})