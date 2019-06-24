import React, { Component } from 'react'
import ChatBoxComponent from './ChatBoxComponent.jsx'
import ChatClientsComponent from './ChatClientsComponent.jsx'
import { Container, Grid, Panel } from '../../components'

export default class ChatPage extends Component {
  constructor() {
    super()

    this._onPeerConnected = this._onPeerConnected.bind(this)
    this._onPeerDisconnected = this._onPeerDisconnected.bind(this)

    this.state = {
      peers: {}
    }
  }

  _onPeerConnected(payload) {
    const { peers } = this.state
    let newPeers = {...peers}
    newPeers[payload.id] = payload.name
    this.setState({
      ...this.state,
      peers: newPeers
    })
  }

  _onPeerDisconnected(payload) {
    const { peers } = this.state
    let newPeers = {...peers}
    delete newPeers[payload]
    this.setState({
      ...this.state,
      peers: newPeers
    })
  }

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <ChatClientsComponent peers={Object.values(this.state.peers)} />
            </Grid.Column>
            <Grid.Column width={12}>
              <ChatBoxComponent onPeerConnected={this._onPeerConnected} onPeerDisconnected={this._onPeerDisconnected} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
