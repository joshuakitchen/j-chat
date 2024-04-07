import { Route, Router } from '@solidjs/router'
import { render } from 'solid-js/web'
import { ChatPage, NotFoundPage } from './pages'
import App from './App'
import './assets/index.css'

const root = document.getElementById('root') as HTMLElement

render(
  () => (
    <Router root={App}>
      <Route path='/' component={() => <ChatPage />} />
      <Route path='/*404' component={() => <NotFoundPage />} />
    </Router>
  ),
  root
)
