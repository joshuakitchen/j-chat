import winston from 'winston'
import config from '../app.config'
import { type WebSocket } from 'ws'
import { ADJECTIVES, NAMES } from '../constants'
import { Request } from 'express'
import { getDateString } from '../util'
import uuid4 from 'uuid4'

export type Client = WebSocket & {
  id?: string
  name?: string
  is_admin?: boolean
}

const clients: {
  [key: string]: Client
} = {}

const AUDIO_REGEX =
  /power|cum|nope|no|nice|noice|yeah|yh|ye|shut\ up|stfu|awesome|hello|hi|hey/gi

const sendToAll = (packet: any) => {
  Object.values(clients).forEach((item) => {
    item.send(JSON.stringify(packet))
  })
}

const handlePacket = async function handlePacket(
  ws: Client,
  data: string
): Promise<void> {
  const { packetType, payload } = JSON.parse(data)

  if (packetType === 'message') {
    const message = payload
    if (message.length === 0) return
    if (message.startsWith('!')) {
      let action = false
      let msg = message.substring(1, message.length).split(' ')
      switch (msg[0].toLowerCase()) {
        case 'makemeadmin':
          action = true
          if (msg[1] === config.admin_key) {
            winston.info(
              `[${getDateString()}][WS][${ws.id}]: ${
                ws.name
              }] has been made admin.`
            )
            ws.is_admin = true
            sendToAll({
              packetType: 'message',
              payload: {
                message: `${ws.name} is now an administrator.`,
                name: 'System',
                audio: null,
              },
            })
          } else {
            winston.warn(
              `[${getDateString()}][WS][${ws.id}]: ${
                ws.name
              }] tried to make themselves admin using a wrong key.`
            )
            ws.send(
              JSON.stringify({
                packetType: 'message',
                payload: {
                  message: `Invalid admin key.`,
                  name: 'System',
                  audio: null,
                },
                id: ws.id,
              })
            )
          }
          break
      }
      if (action) return
    }
    let audio = null
    let match = message.toLowerCase().match(AUDIO_REGEX)
    if (match) {
      audio = match[0]

      if (audio === 'noice') audio = 'nice'
      else if (audio === 'yh' || audio === 'ye') audio = 'yeah'
      else if (audio === 'stfu') audio = 'shut up'
      else if (audio === 'hi' || audio === 'hey') audio = 'hello'
    }

    Object.values(clients).forEach((item) => {
      item.send(
        JSON.stringify({
          packetType: 'message',
          payload: {
            message: message,
            name: ws.name,
            audio: audio,
          },
          id: ws.id,
        })
      )
    })

    winston.info(
      `[${getDateString()}][WS][${ws.id}] Message has been sent [${
        ws.name
      }]: ${message}`
    )
  } else if (packetType === 'connect') {
    let id = uuid4()
    while (clients[id]) id = uuid4()
    ws.id = id
    ws.name = `${ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]} ${
      NAMES[Math.floor(Math.random() * NAMES.length)]
    }`

    ws.send(
      JSON.stringify({
        packetType: 'connected',
        payload: {
          id,
          name: ws.name,
          peers: Object.values(clients).map((item) => ({
            id: item.id,
            name: item.name,
          })),
        },
      })
    )

    ws.send(
      JSON.stringify({
        packetType: 'message',
        payload: {
          message: 'Welcome to Chatter!',
          name: 'System',
          audio: null,
        },
      })
    )

    clients[id] = ws

    Object.values(clients).forEach((item) => {
      if (item.name !== ws.name) {
        item.send(
          JSON.stringify({
            packetType: 'message',
            payload: {
              message: `${ws.name} has just entered Chatter.`,
              name: 'System',
              audio: null,
            },
          })
        )
      }
      item.send(
        JSON.stringify({
          packetType: 'join',
          payload: {
            id: ws.id,
            name: ws.name,
          },
        })
      )
    })

    winston.info(
      `[${getDateString()}][WS][${
        ws.id
      }] WebSocket connection has been established with guid.`
    )
  } else {
    throw new Error('Unhandled PacketType!')
  }
}

export const socketHandler = function socketHandler(ws: Client, req: Request) {
  winston.info(
    `[${getDateString()}][WS][null] WebSocket connection has been accepted.`
  )

  ws.on('message', (data) => {
    handlePacket(ws, data.toString('utf-8')).catch((err) => {
      winston.error(err.stack)
      ws.send(
        JSON.stringify({
          packetType: 'error',
          payload: err.message,
        })
      )
    })
  })

  ws.on('close', () => {
    Object.values(clients).forEach((item) => {
      if (item.id === ws.id) return
      item.send(
        JSON.stringify({
          packetType: 'left',
          payload: ws.id,
        })
      )
    })

    if (ws.id) {
      delete clients[ws.id]
    }
    winston.info(
      `[${getDateString()}][WS][${
        ws.id
      }] WebSocket connection has been disconnected.`
    )
  })
}

export default socketHandler
