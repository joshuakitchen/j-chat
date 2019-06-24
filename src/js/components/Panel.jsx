import React, { Component } from 'react'

class PanelHeader extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className='header' style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}

class PanelBody extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className='body' style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}

class Panel extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className='panel' style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}

Panel.Header = PanelHeader
Panel.Body = PanelBody

export default Panel
