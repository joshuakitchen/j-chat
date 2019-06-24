import cx from 'classnames'
import React from 'react'

import {
  getElementType
} from '../../util'
import FormTextArea from './FormTextArea.jsx'

function Form(props) {
  const { className } = props
  const classes = cx(
    'form',
    className
  )
  const ElementType = getElementType(Form, props)
  return (
    <ElementType className={classes}>
      {props.children || props.content}
    </ElementType>
  )
}

Form.defaultProps = {
  as: 'form'
}

Form.TextArea = FormTextArea

export default Form
