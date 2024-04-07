import {
  Component,
  For,
  Show,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js'
import { Container, Panel } from '../components'
import { FaSolidComment, FaSolidUser, FaSolidUsers } from 'solid-icons/fa'
import { createStore } from 'solid-js/store'
import { cx, playSound, playSoundMap } from '../util'

export type Peer = { id: string; name: string }

type BasePacket<P extends string, T> = {
  packetType: P
  payload: T
}
type ConnectedPacket = BasePacket<
  'connected',
  Peer & {
    peers: Array<Peer>
  }
>
type MessagePacket = BasePacket<
  'message',
  {
    audio: string | null
    message: string
    name: string
  }
>
type JoinPacket = BasePacket<'join', Peer>
type LeftPacket = BasePacket<'left', string>
export type Packet = ConnectedPacket | MessagePacket | JoinPacket | LeftPacket

export const ChatPage: Component = function ChatPage() {
  const [ws, setWs] = createSignal<WebSocket>()
  const [store, setStore] = createStore<{
    connected: boolean
    self?: Peer
    peers: Array<Peer>
    messages: Array<{ plain: boolean; text: string; name: string }>
  }>({
    connected: false,
    self: undefined,
    peers: [],
    messages: [],
  })
  let textRef: HTMLTextAreaElement | undefined
  let endRef: HTMLDivElement | undefined

  const onOpen = () => {
    let sock = ws()
    if (sock) {
      sock.send(
        JSON.stringify({
          packetType: 'connect',
          payload: null,
        })
      )
    }
  }

  const onMessage = (ev: MessageEvent<string>) => {
    const { packetType, payload } = JSON.parse(ev.data) as Packet
    if (packetType === 'connected') {
      setStore('connected', true)
      setStore('self', payload)
      setStore('peers', payload.peers)
    } else if (packetType === 'join') {
      setStore('peers', [...store.peers, payload])
      if (payload.id !== store.self?.id) {
        playSound(1)
      }
    } else if (packetType === 'left') {
      setStore(
        'peers',
        [...store.peers].filter((item) => item.id !== payload)
      )
    } else if (packetType === 'message') {
      if (payload.audio) {
        playSoundMap(payload.audio)
      }
      setStore('messages', [
        ...store.messages,
        {
          plain: payload.name === 'System',
          text: payload.message,
          name: payload.name,
        },
      ])
      endRef?.scrollIntoView()
    }
  }

  const onKeyDown = (ev: KeyboardEvent) => {
    if (!textRef) {
      return
    }
    if (ev.key === 'Enter' && !ev.shiftKey) {
      ev.preventDefault()
      const sock = ws()
      if (sock) {
        sock.send(
          JSON.stringify({
            packetType: 'message',
            payload: textRef.value,
          })
        )
      }
      textRef.value = ''
    }
  }

  onMount(() => {
    const sock = new WebSocket(
      `${location.protocol.startsWith('https') ? 'wss' : 'ws'}://${
        location.host
      }/socket`
    )
    setWs(sock)
    sock.addEventListener('open', onOpen)
    sock.addEventListener('message', onMessage)
    endRef && endRef.scrollIntoView(true)
    textRef && textRef.focus()

    onCleanup(() => {
      sock.removeEventListener('open', onOpen)
      sock.removeEventListener('message', onMessage)
      sock.close()
    })
  })

  return (
    <Container class='flex gap-5 max-md:flex-col'>
      <Panel class='w-96 max-md:max-h-40'>
        <Panel.Header class='flex gap-5'>
          <FaSolidUsers class='my-auto' />
          Peers
        </Panel.Header>
        <Panel.Body class='p-0 flex flex-col'>
          <For each={store.peers}>
            {(peer) => (
              <div class='flex p-4 gap-5 border-b border-black/10 bg-white'>
                <FaSolidUser class='my-auto' />
                {peer.name}
              </div>
            )}
          </For>
        </Panel.Body>
      </Panel>
      <Panel class='flex-1'>
        <Panel.Header class='flex gap-5'>
          <FaSolidComment class='my-auto' />
          Chat
        </Panel.Header>
        <Panel.Body class='flex flex-col gap-5 overflow-hidden'>
          <div class='flex flex-col flex-1 bg-white border border-gray-400 rounded-md p-5 overflow-y-scroll gap-5'>
            <For each={store.messages}>
              {(message) => (
                <div
                  class={cx('w-[70%]', {
                    'font-semibold': message.plain,
                    'ml-auto text-right': message.name === store.self?.name,
                  })}
                  ref={endRef}
                >
                  <div
                    class={cx({
                      'bg-gray-200 p-5 rounded-lg': !message.plain,
                      'bg-purple-200': message.name === store.self?.name,
                    })}
                  >
                    {message.text}
                  </div>
                  <Show when={!message.plain}>
                    <small>{message.name}</small>
                  </Show>
                </div>
              )}
            </For>
          </div>
          <textarea
            class='w-full max-h-24 p-2 outline-none rounded-md transition-colors border border-gray-400 shadow-black/40 focus:border-purple-700 focus:shadow-md'
            onKeyDown={onKeyDown}
            ref={textRef}
          />
        </Panel.Body>
      </Panel>
    </Container>
  )
}

export default ChatPage
