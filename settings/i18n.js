const path = require('path')

const nextConfig = require('next/config').default()

const defaultLocale = 'ru'
const locales = [defaultLocale, 'kk', 'en']
const localeSeparator = '_'

const cleanUrl = (url) => {
  const locale = url.split('/')[0].split(localeSeparator)[1]
  let cleanUrl = url.slice()
  if (locale) {
    cleanUrl = cleanUrl.replace(`${localeSeparator}${locale}`, '')
  }
  return {
    url: cleanUrl,
    locale: locale || defaultLocale,
  }
}

const convertCityToLocale = (city, locale) => {
  if (locale === defaultLocale) {
    return city
  }
  return `${city}${localeSeparator}${locale}`
}

const config = {
  browserLanguageDetection: false,
  serverLanguageDetection: false,
  localeSubpaths: nextConfig?.publicRuntimeConfig?.localeSubpaths || {},
  localePath: path.resolve('./public/locales'),
  strictMode: false,
  i18n: {
    defaultLocale,
    locales: locales.slice(1),
  },
}
module.exports = {
  cleanUrl,
  config,
  convertCityToLocale,
  defaultLocale,
  locales,
}
