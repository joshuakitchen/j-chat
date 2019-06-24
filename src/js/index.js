import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MovingBubbles from './movingbubbles'
import { ChatPage, FourOFour } from './pages'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={ChatPage} />
      <Route path='/*' component={FourOFour} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('react-container')
)
