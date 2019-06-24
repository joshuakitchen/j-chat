import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Grid,
  Panel
} from '../components'

export default class ChatPage extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Container>
        <Panel>
          <Panel.Header>
            <h3><span className='fa fa-exclamation-triangle fa-fw mr-20' />404 - Page Not Found</h3>
          </Panel.Header>
          <Panel.Body>
            <p>
              The given page you are looking for could not be found, quite difficult considering we've only
              got a single page.
            </p>

            <br />

            <p>
              <Link to='/'>
                Go back to the chat.
              </Link>
            </p>
          </Panel.Body>
        </Panel>
      </Container>
    )
  }
}
