

export default function getElementType(Component, props, getDefault) {
  const { defaultProps = {} } = Component

  if (props.as && props.as !== defaultProps.as) return props.as

  if(getDefault) {
    const computedDefault = getDefault()
    if(computedDefault) return computedDefault
  }

  if(props.href) return 'a'

  return defaultProps.as || 'div'
}
