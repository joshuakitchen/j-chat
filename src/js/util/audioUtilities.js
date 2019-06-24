
const sound_map = {
  power: [
    new Audio('/static/audio/power-logo.mp3')
  ],
  nope: [
    new Audio('/static/audio/nope.mp3')
  ],
  no: [
    new Audio('/static/audio/no.mp3')
  ],
  nice: [
    new Audio('/static/audio/click-nice.mp3')
  ],
  yeah: [
    new Audio('/static/audio/yeah.mp3')
  ],
  'shut up': [
    new Audio('/static/audio/stfu-1.mp3'),
    new Audio('/static/audio/stfu-2.mp3'),
    new Audio('/static/audio/stfu-3.mp3')
  ],
  awesome: [
    new Audio('/static/audio/awesome.mp3')
  ],
  hello: [
    new Audio('/static/audio/hello-1.mp3'),
    new Audio('/static/audio/hello-2.mp3'),
    new Audio('/static/audio/hello-3.mp3'),
    new Audio('/static/audio/hello-4.mp3')
  ]
}

const sounds = [
  null,
  new Audio('/static/audio/surprise-motherfucker.mp3')
]

export function playSound(id) {
  sounds[id].currentTime = 0;
  sounds[id].play()
}

export function playSoundMap(name) {
  if(!sound_map[name])
    return
  const sound = Math.floor(Math.random() * sound_map[name].length)
  sound_map[name][sound].currentTime = 0
  sound_map[name][sound].play()
}
