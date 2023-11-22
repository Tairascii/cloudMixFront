import { LocaleEnum } from '../stores/types'

export const cityWithLocale = (city: string, locale: string): string => {
  if (locale === LocaleEnum.ru) {
    return city
  }
  return `${city}_${locale}`
}
