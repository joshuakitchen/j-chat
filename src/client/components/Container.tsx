import { Component, JSX, ParentProps, splitProps } from 'solid-js'
import { cx } from '../util'

export type ContainerProps = ParentProps & JSX.HTMLAttributes<HTMLDivElement>

export const Container: Component<ContainerProps> = function Component(props) {
  const [local, extension] = splitProps(props, ['class'])
  return <div class={cx('mx-auto w-full h-full', local.class)} {...extension} />
}

export default Container
