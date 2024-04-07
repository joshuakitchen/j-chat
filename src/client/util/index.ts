import classnames from 'classnames'
import { twMerge } from 'tailwind-merge'

export function cx(...args: classnames.ArgumentArray) {
  return twMerge(classnames(args))
}

export { playSound, playSoundMap } from './audioUtilities'
