import { Component, ParentProps } from 'solid-js'
import BubbleBackground from './components/BubbleBackground'

export const App: Component<ParentProps> = function App(props) {
  return (
    <>
      <BubbleBackground />
      <div class='h-full md:p-24'>{props.children}</div>
    </>
  )
}

export default App
