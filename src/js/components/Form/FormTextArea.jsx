import cx from 'classnames'
import React from 'react'

import {
  getElementType
} from '../../util'

function FormTextArea(props) {
  const {
    className,
    onChange,
    onKeyDown,
    value
  } = props
  const classes = cx(
    'form-control',
    className
  )
  const ElementType = getElementType(FormTextArea, props)
  return (
    <ElementType className={classes} value={value} onChange={onChange} onKeyDown={onKeyDown}>
      {props.children || props.content}
    </ElementType>
  )
}

FormTextArea.defaultProps = {
  as: 'textarea'
}

export default FormTextArea
