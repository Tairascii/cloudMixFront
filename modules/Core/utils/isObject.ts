import { isArray } from './isArray'

export const isObject = (obj: any): boolean =>
  obj === Object(obj) && !isArray(obj) && typeof obj !== 'function'
