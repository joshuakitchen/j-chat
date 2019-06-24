import cx from 'classnames'
import React from 'react'

import {
  getElementType
} from '../../util'

function GridRow(props) {
  const { className } = props
  const classes = cx(
    'row',
    className
  )
  const ElementType = getElementType(GridRow, props)
  return (
    <ElementType className={classes}>
      {props.children || props.content}
    </ElementType>
  )
}

export default GridRow
