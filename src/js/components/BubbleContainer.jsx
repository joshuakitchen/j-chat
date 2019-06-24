import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Bubble extends Component {
  constructor() {
    super()

    this.state = {
      diameter: Math.floor(Math.random() * 160) + 40
    }
  }

  componentWillMount() {

  }

  render() {
    return (
      <div key={this.props.id} id={`bubble${this.props.id}`} className='bubble' style={{
        width: `${this.state.diameter}px`,
        height: `${this.state.diameter}px`
      }} />
    )
  }
}

export default class BubbleContainer extends Component {
  constructor() {
    super()

    this.state = {
      bubbles: []
    }
  }

  componentWillMount() {
    const bubbles = []
    for(let i = 0; i < 20; i++) {
      bubbles.push(<Bubble id={i} />)
    }
    this.setState({
      ...this.state,
      bubbles
    })
  }

  render() {
    console.log('test')
    return ReactDOM.createPortal(
      <div id='bubbleContainer2'>
        {this.state.bubbles}
      </div>,
      document.getElementsByTagName('body')[0]
    )
  }
}
