import cx from 'classnames'
import React, { PureComponent } from 'react'

import {
  useKeyOnly
} from '../../util'

export default class ChatboxMessage extends PureComponent {
  render() {
    const wrapperClasses = cx(
      'message-item-wrapper',
      useKeyOnly(this.props.me, 'me')
    )
    const classes = cx(
      'message-item',
      useKeyOnly(this.props.plain, 'plain'),
      useKeyOnly(this.props.me, 'me')
    )
    let { message, name } = this.props.message

    if(message.match(/\n/)) {
      message = message.split(/\n/g).map(item => (
        <p>{item || ' \u00A0'}</p>
      ))
    }

    return (
      <div className={wrapperClasses}>
        <div className={classes}>
          {message}
        </div>
        {this.props.hidename ? null : (
          <small>{name}</small>
        )}
      </div>
    )
  }
}
