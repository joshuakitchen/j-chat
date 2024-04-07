import { Component } from 'solid-js'
import { Container, Panel } from '../components'
import { A } from '@solidjs/router'
import { FaSolidTriangleExclamation } from 'solid-icons/fa'

export const NotFoundPage: Component = function NotFoundPage() {
  return (
    <Container>
      <Panel>
        <Panel.Header class='flex gap-5'>
          <FaSolidTriangleExclamation class='my-auto' />
          404 - Page Not Found
        </Panel.Header>
        <Panel.Body>
          <p>
            The given page you are looking for could not be found, quite
            difficult considering we've only got a single page.
          </p>

          <br />

          <p>
            <A href='/'>Go back to the chat.</A>
          </p>
        </Panel.Body>
      </Panel>
    </Container>
  )
}

export default NotFoundPage
