import cx from 'classnames'
import React from 'react'

import {
  getElementType
} from '../../util'
import GridRow from './GridRow.jsx'
import GridColumn from './GridColumn.jsx'

function Grid(props) {
  const { className } = props
  const classes = cx(
    'grid',
    className
  )
  const ElementType = getElementType(Grid, props)
  return (
    <ElementType className={classes}>
      {props.children || props.content}
    </ElementType>
  )
}

Grid.Column = GridColumn
Grid.Row = GridRow

export default Grid
