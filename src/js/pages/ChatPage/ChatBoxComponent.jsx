import cx from 'classnames'

import React, { Component, PureComponent } from 'react'
import { Container, Form, Grid, Panel } from '../../components'

import {
  playSound,
  playSoundMap
} from '../../util'

import ChatboxMessage from './ChatboxMessage.jsx'

export default class ChatBoxComponent extends Component {
  constructor() {
    super()

    this._sendMessage = this._sendMessage.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this._handleChange = this._handleChange.bind(this)

    this.ws = new WebSocket(`${location.protocol.startsWith('https') ? 'wss' : 'ws'}://${location.host}/socket`)
    this.ws.onopen = this._onOpen.bind(this)
    this.ws.onmessage = this._onMessageReceived.bind(this)

    this.state = {
      messages: [],
      message: '',
      guid: null
    }
  }

  _sendMessage() {
    const { message } = this.state
    if(message.length === 0)
      return
    this.ws.send(JSON.stringify({
      packetType: 'message',
      payload: message
    }))
    this.setState({
      ...this,
      message: ''
    })
  }

  _onOpen(e) {
    this.ws.send(JSON.stringify({
      packetType: 'connect',
      payload: null
    }))
  }

  _onMessageReceived(e) {
    const { messages, guid } = this.state
    const data = JSON.parse(e.data)
    const { packetType, payload, id } = data
    if(packetType === 'message') {
      if(payload.audio) {
        try {
          playSoundMap(payload.audio)
        } catch (err) {}
      }
      this.setState({
        ...this.state,
        messages: messages.concat([
          {
            message: payload,
            me: guid === id,
            plain: payload.name === 'System',
            hidename: payload.name === 'System'
          }
        ])
      })
      this.messagesEnd.scrollIntoView()
    } else if(packetType === 'connected') {
      this.setState({
        ...this.state,
        guid: payload.id
      })
      payload.peers.forEach(this.props.onPeerConnected)
    } else if(packetType === 'join') {
      if(this.state.guid !== payload.id) {
        try {
          playSound(1)
        } catch (err) {}
      }
      this.props.onPeerConnected(payload)
    } else if(packetType === 'left') {
      this.props.onPeerDisconnected(payload)
    }
  }

  _handleKeyDown(e) {
    if(e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      this._sendMessage()
    }
  }

  _handleChange(e) {
    this.setState({
      ...this.state,
      message: e.target.value
    })
  }

  componentDidMount() {
    this.messagesEnd.scrollIntoView()
  }

  render() {
    const {
      messages
    } = this.state

    const messageElements = messages.map((item, idx) => {
      return (
        <ChatboxMessage key={idx} {...item} />
      )
    })

    return (
      <Panel>
        <Panel.Header>
          <h3><span className='fa fa-comments fa-fw mr-20' />Chat</h3>
        </Panel.Header>
        <Panel.Body>
          <div className='message-box'>
            {messageElements}
            <div ref={(el) => { this.messagesEnd = el; }} />
          </div>
          <div className='message-chat'>
            <Form>
              <Form.TextArea onKeyDown={this._handleKeyDown} onChange={this._handleChange} value={this.state.message} />
            </Form>
          </div>
        </Panel.Body>
      </Panel>
    )
  }
}
