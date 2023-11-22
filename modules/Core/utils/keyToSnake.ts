import { keysToStyle } from './keysToStyle'

const toSnake = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

export const keysToSnake = keysToStyle(toSnake)
