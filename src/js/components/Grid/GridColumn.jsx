import cx from 'classnames'
import React from 'react'

import {
  getElementType
} from '../../util'

function GridColumn(props) {
  const { className } = props
  const classes = cx(
    `col-${props.width}`,
    className
  )
  const ElementType = getElementType(GridColumn, props)
  return (
    <ElementType className={classes}>
      {props.children || props.content}
    </ElementType>
  )
}

export default GridColumn
