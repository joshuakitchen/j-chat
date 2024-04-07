import {
  Component,
  For,
  ParentProps,
  createEffect,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
} from 'solid-js'
import { createStore, produce } from 'solid-js/store'

export type Bubble = {
  x: number
  y: number
  xVel: number
  yVel: number
  time: number
  ref?: HTMLDivElement
  diam: number
  hsla: string
  shadow: number
  opacity: number
}

export type BubbleBackgroundProps = ParentProps<{
  hue?: number
  hueRand?: number
  saturation?: number
  saturationRand?: number
  light?: number
  lightRand?: number
  opacityFactor?: number
  minOpacity?: number
  ratio?: number
}>

type BubbleBackgroundPropsResolved = ParentProps<{
  hue: number
  hueRand: number
  saturation: number
  saturationRand: number
  light: number
  lightRand: number
  opacityFactor: number
  minOpacity: number
  ratio: number
}>

const getBubbleColor = function getRandomgetBubbleColorColor(
  props: BubbleBackgroundPropsResolved
) {
  var hue = Math.floor(Math.random() * props.hueRand) + props.hue
  var saturation =
    Math.floor(Math.random() * props.saturationRand) + props.saturation
  var light = Math.floor(Math.random() * props.lightRand) + props.light
  var opacity = Math.min(
    //The opacity must be <= 1
    Math.max(
      //The random opacity must be >= minOpacity
      Math.random() / props.opacityFactor,
      props.minOpacity
    ),
    1
  )
  return {
    hue,
    saturation,
    light,
    opacity,
  }
}

export const BubbleBackground: Component<BubbleBackgroundProps> =
  function BubbleBackground(props) {
    const newProps: BubbleBackgroundPropsResolved = mergeProps(
      {
        hue: 285,
        hueRand: 20,
        saturation: 63,
        saturationRand: 10,
        light: 57,
        lightRand: 10,
        opacityFactor: 3,
        minOpacity: 0.1,
        ratio: 45000,
      },
      props
    )

    const ratio = 45000
    const bubbleLength = Math.floor(
      (window.innerWidth * window.innerHeight) / ratio
    )
    const defaultBubbles: Array<Bubble> = []

    const createBubble = (existing?: Bubble): Bubble => {
      const color = getBubbleColor(newProps)
      const newBubble = {
        time: 0,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        xVel: Math.random() * 0.5 - 0.25,
        yVel: Math.random() * 0.5 - 0.25,
        diam: Math.floor(Math.random() * 160) + 40,
        hsla: `hsla(${color.hue},${color.saturation}%,${color.light}%,${color.opacity})`,
        shadow: Math.random() * 10 + 5,
        opacity: 0,
      }
      if (existing) {
        existing.time = newBubble.time
        existing.x = newBubble.x
        existing.y = newBubble.y
        existing.xVel = newBubble.xVel
        existing.yVel = newBubble.yVel
        existing.diam = newBubble.diam
        existing.hsla = newBubble.hsla
        existing.shadow = newBubble.shadow
        existing.opacity = newBubble.opacity
        return existing
      }
      return newBubble
    }

    for (let i = 0; i < bubbleLength; i++) {
      defaultBubbles.push(createBubble())
    }

    const [bubbles, setBubbles] = createStore(defaultBubbles)
    const [frameIdx, setFrameIdx] = createSignal(-1)

    const animateBubbles = () => {
      for (let i = 0; i < bubbles.length; i++) {
        setBubbles(
          i,
          produce((bubble: Bubble) => {
            if (
              bubble.x + bubble.diam < 0 ||
              bubble.x > window.innerWidth ||
              bubble.y + bubble.diam < 0 ||
              bubble.y - bubble.diam > window.innerHeight
            ) {
              createBubble(bubble)
            }
            if (bubble.time < 21) {
              bubble.opacity = bubble.time / 20
            }
            bubble.x = bubble.x + bubble.xVel
            bubble.y = bubble.y + bubble.yVel
            bubble.time++
          })
        )
      }
      setFrameIdx(requestAnimationFrame(animateBubbles))
    }

    onMount(() => {
      setFrameIdx(requestAnimationFrame(animateBubbles))

      onCleanup(() => {
        if (frameIdx() !== -1) {
          cancelAnimationFrame(frameIdx())
        }
      })
    })

    createEffect(() => {})

    return (
      <div class='fixed left-0 top-0 -z-20 w-full h-full bg-gradient-to-b from-purple-700 to-purple-900'>
        <For each={bubbles}>
          {(bubble, idx) => (
            <div
              id={`bubble-${idx()}`}
              class='fixed rounded-full -z-10'
              style={{
                left: `${bubble.x}px`,
                top: `${bubble.y}px`,
                width: `${bubble.diam}px`,
                height: `${bubble.diam}px`,
                'background-color': bubble.hsla,
                'box-shadow': `0 0 ${bubble.shadow}px ${bubble.hsla}`,
                opacity: bubble.opacity,
              }}
              ref={(ref) => {
                setBubbles(idx(), 'ref', ref)
              }}
            />
          )}
        </For>
      </div>
    )
  }

export default BubbleBackground
