export interface UserAgent {
  readonly browser: string
  readonly browserVersion: number
  readonly deviceType: string | null
  readonly deviceVendor: string | null
  readonly isAndroid: boolean
  readonly isBot: boolean
  readonly isChrome: boolean
  readonly isChromeOS: boolean
  readonly isDesktop: boolean
  readonly isFirefox: boolean
  readonly isIE: boolean
  readonly isIos: boolean
  readonly isIpad: boolean
  readonly isIphone: boolean
  readonly isMac: boolean
  readonly isMobile: boolean
  readonly isSafari: boolean
  readonly isTablet: boolean
  readonly isWindows: boolean
  readonly os: string
  readonly osVersion: number
  readonly source: string
}

export const BOT_UA = [
  '\\+https:\\/\\/developers.google.com\\/\\+\\/web\\/snippet\\/',
  'googlebot',
  'baiduspider',
  'gurujibot',
  'yandexbot',
  'slurp',
  'msnbot',
  'bingbot',
  'facebookexternalhit',
  'linkedinbot',
  'twitterbot',
  'slackbot',
  'telegrambot',
  'applebot',
  'pingdom',
  'tumblr',
]
