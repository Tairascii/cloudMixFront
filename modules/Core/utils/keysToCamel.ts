import { keysToStyle } from './keysToStyle'

const toCamel = (s: string): string =>
  s.replace(/([-_][a-z])/gi, (match) =>
    match.toUpperCase().replace('-', '').replace('_', ''),
  )

export const keysToCamel = keysToStyle(toCamel)
