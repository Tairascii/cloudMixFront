export enum LocaleEnum {
  en = 'en',
  kk = 'kk',
  ru = 'ru',
}

export interface ICoreStore {
  locale: LocaleEnum
  setLocale: (locale: LocaleEnum) => void
}
