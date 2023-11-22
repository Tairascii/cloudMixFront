import { UAParser, IUAParser } from 'ua-parser-js'
import { BOT_UA, UserAgent } from './constants'

export function parse(phase: string): UserAgent {
  const result: IUAParser.IResult = new UAParser(phase).getResult()

  const regex = new RegExp(`(${BOT_UA.join('|')})`, 'ig')
  const isBot = phase ? regex.test(phase.toLowerCase()) : false

  const browser: string = result.browser?.name ?? null
  const deviceType: string = result.device.type || null
  const os: string = result.os?.name ?? null
  const isMobile: boolean = deviceType === 'mobile'
  const isTablet: boolean = deviceType === 'tablet'
  const isIos: boolean = os === 'iOS'

  const ua: UserAgent = Object.freeze({
    browser,
    deviceType,
    os,
    isMobile,
    isTablet,
    isIos,
    source: phase,
    deviceVendor: result.device.vendor || null,
    osVersion: parseInt(result.os.version, 10),
    browserVersion: parseFloat(result.browser.version),
    isIphone: isMobile && isIos,
    isIpad: isTablet && isIos,
    isDesktop: !isMobile && !isTablet,
    isChrome: browser === 'Chrome',
    isFirefox: browser === 'Firefox',
    isSafari: browser === 'Safari',
    isIE: browser === 'IE',
    isMac: os === 'Mac OS',
    isChromeOS: os === 'Chromium OS',
    isWindows: os === 'Windows',
    isAndroid: os === 'Android',
    isBot,
  })

  return ua
}
