import { Component, JSX, ParentProps, splitProps } from 'solid-js'
import { cx } from '../util'

export type PanelBodyProps = ParentProps & JSX.HTMLAttributes<HTMLDivElement>
export const PanelBody: Component<PanelBodyProps> = function PanelBody(props) {
  const [local, extension] = splitProps(props, ['class'])
  return (
    <div
      class={cx(
        'flex-1 px-4 py-2 bg-gray-300 first:rounded-t-md last:rounded-b-md',
        local.class
      )}
      {...extension}
    ></div>
  )
}

export type PanelHeaderProps = ParentProps & JSX.HTMLAttributes<HTMLDivElement>
export const PanelHeader: Component<PanelHeaderProps> = function PanelHeader(
  props
) {
  const [local, extension] = splitProps(props, ['class'])
  return (
    <div
      class={cx(
        'text-gray-100',
        'px-4 py-2',
        'uppercase text-lg [text-shadow:0px_0px_15px_black]',
        '[background-image:linear-gradient(to_bottom,rgba(255,255,255,0.03)_50%,rgba(0,0,0,0)_52%),linear-gradient(to_bottom,#29364a_50%,rgba(0,0,0,0)_52%)]',
        '[background-size:auto,125px_125px]',
        'first:rounded-t-md',
        'last:rounded-b-md',
        local.class
      )}
      {...extension}
    ></div>
  )
}

export type PanelProps = ParentProps & JSX.HTMLAttributes<HTMLDivElement>

type PanelComponent = Component<PanelProps> & {
  Header: typeof PanelHeader
  Body: typeof PanelBody
}

export const Panel: PanelComponent = function Panel(props) {
  const [local, extension] = splitProps(props, ['class'])
  return (
    <div
      class={cx(
        'h-full rounded-md shadow-lg shadow-black/40 flex flex-col',
        local.class
      )}
      {...extension}
    ></div>
  )
}

Panel.Header = PanelHeader
Panel.Body = PanelBody

export default Panel
