const sound_map: { [key: string]: Array<HTMLAudioElement> } = {
  power: [new Audio('/static/audio/power-logo.mp3')],
  cum: [
    new Audio('/static/audio/cum-1.mp3'),
    new Audio('/static/audio/cum-2.mp3'),
  ],
  nope: [new Audio('/static/audio/nope.mp3')],
  no: [new Audio('/static/audio/no.mp3')],
  nice: [new Audio('/static/audio/click-nice.mp3')],
  yeah: [new Audio('/static/audio/yeah.mp3')],
  'shut up': [
    new Audio('/static/audio/stfu-1.mp3'),
    new Audio('/static/audio/stfu-2.mp3'),
    new Audio('/static/audio/stfu-3.mp3'),
  ],
  awesome: [new Audio('/static/audio/awesome.mp3')],
  hello: [
    new Audio('/static/audio/hello-1.mp3'),
    new Audio('/static/audio/hello-2.mp3'),
    new Audio('/static/audio/hello-3.mp3'),
    new Audio('/static/audio/hello-4.mp3'),
  ],
}

const sounds: Array<HTMLAudioElement | null> = [
  null,
  new Audio('/static/audio/surprise-motherfucker.mp3'),
]

export function playSound(id: number) {
  try {
    const sound = sounds[id]
    if (sound !== null) {
      sound.currentTime = 0
      sound.play()
    }
  } catch (err) {}
}

export function playSoundMap(name: string) {
  if (!sound_map[name]) return
  try {
    const sound = Math.floor(Math.random() * sound_map[name].length)
    sound_map[name][sound].currentTime = 0
    sound_map[name][sound].play()
  } catch (err) {}
}
