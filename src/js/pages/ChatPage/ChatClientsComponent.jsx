import React, { Component } from 'react'
import { Container, Grid, Panel } from '../../components'

export default class ChatClientsComponent extends Component {
  constructor() {
    super()
  }

  render() {
    const {
      peers
    } = this.props

    const peerElements = peers.map((item, idx) => {
      return (
        <Panel.Body key={idx}><span className='fa fa-user fa-fw mr-20' />{item}</Panel.Body>
      )
    })

    return (
      <Panel>
        <Panel.Header>
          <h3><span className='fa fa-users fa-fw mr-20' />Peers</h3>
        </Panel.Header>
        {peerElements}
      </Panel>
    )
  }
}
