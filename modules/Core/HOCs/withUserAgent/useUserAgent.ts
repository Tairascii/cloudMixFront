import { useEffect, useState } from 'react'
import { debounce } from '../../utils/debounce'
import { UserAgent } from './constants'
import { parse } from './helpers'

export function getUserAgent(phase: string): UserAgent {
  return parse(phase)
}

export function getClientUserAgent(): UserAgent {
  return getUserAgent(window.navigator.userAgent)
}

export function useClientUserAgent(): UserAgent | undefined {
  const [uaLocal, setUaLocal] = useState<UserAgent>()
  const [windowWidth, setWindowWidth] = useState<number>(0)

  const setWindowWidthCallback = debounce(() => {
    setWindowWidth(document.documentElement.clientWidth)
  }, 500)

  useEffect(() => {
    window.addEventListener('resize', setWindowWidthCallback)

    return (): void => {
      window.removeEventListener('resize', setWindowWidthCallback)
    }
  }, [])

  useEffect(() => {
    const ua = parse(window.navigator.userAgent)
    setUaLocal(ua)
  }, [windowWidth])

  return uaLocal
}
