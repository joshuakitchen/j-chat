import { Application } from 'express-ws'
import base from './base.page'
import socket from './socket'

export const setupRoutes = function setupRoutes(app: Application) {
  app.ws('/socket', socket)
}

export { base }
