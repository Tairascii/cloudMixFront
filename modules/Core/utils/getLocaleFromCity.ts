import { LocaleEnum } from 'Core/stores/types'

export const getLocaleFromCity = (locale: string): string => {
  const splitted = locale.split('_')
  if (splitted.length === 1) return LocaleEnum.ru
  return splitted[1]
}
