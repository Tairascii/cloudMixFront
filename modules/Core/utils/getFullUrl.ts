import { NextApiRequest } from 'next'
import getConfig from 'next/config'
import { getCityPrefix } from './getCityPrefix'
import { isEmptyObj } from './isEmptyObj'

export const getClientDomain = (): string => {
  const host = typeof window !== 'undefined' ? window.location.host : ''

  if (host) {
    const url =
      host.indexOf('localhost') > -1 ? `http://${host}` : `https://${host}`

    return url
  }

  return ''
}

export const getSsrDomain = (req: NextApiRequest): string => {
  const host = req?.headers['x-forwarded-host'] ?? req?.headers?.host ?? ''
  const url =
    host.indexOf('localhost') > -1 ? `http://${host}` : `https://${host}`

  return url
}

export const getStaticPath = (staticFilePath: string): string => {
  const { publicRuntimeConfig } = getConfig()
  const { assetPrefix } = publicRuntimeConfig
  if (assetPrefix) {
    return assetPrefix + staticFilePath
  }
  return staticFilePath
}

interface UrlParams {
  city: string
  locale: string
  uri: string
}

export const getFullUrl = (
  { city, uri, locale }: UrlParams,
  req?: NextApiRequest,
): string => {
  const cityPrefix = getCityPrefix(city, locale)
  const domain = isEmptyObj(req) ? getClientDomain() : getSsrDomain(req!)

  return `${domain}${cityPrefix}${uri}`
}
