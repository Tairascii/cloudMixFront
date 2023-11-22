import { convertCityToLocale } from 'settings/i18n'

export const getCityPrefix = (slug: string, locale: string): string => {
  const localizedCity = convertCityToLocale(slug, locale)
  return localizedCity === 'almaty' && locale === 'ru'
    ? ''
    : `/${localizedCity}`
}
