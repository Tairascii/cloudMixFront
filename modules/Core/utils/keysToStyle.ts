import { isArray } from './isArray'
import { isObject } from './isObject'

type StyleTransformer = (str: string) => string
type KeysToStyleResult = <NormalizedType>(o: any) => NormalizedType

export const keysToStyle =
  (styleTransformer: StyleTransformer): KeysToStyleResult =>
  <NormalizedType>(obj: any): NormalizedType => {
    const toSelectedStyle = keysToStyle(styleTransformer)

    const transformObject = <T>(obj: any): T =>
      Object.entries(obj).reduce((acc, [k, v]) => {
        acc[styleTransformer(k)] = toSelectedStyle(v)
        return acc
      }, {}) as T

    const transformArray = (arr: unknown[]): unknown[] =>
      arr.map(toSelectedStyle)

    if (isObject(obj)) {
      return transformObject<NormalizedType>(obj)
    }
    if (isArray(obj)) {
      return transformArray(obj) as unknown as NormalizedType
    }

    return obj
  }
