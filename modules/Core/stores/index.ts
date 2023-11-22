import { makeAutoObservable, runInAction } from 'mobx'
import { ICoreStore, LocaleEnum } from './types'

export class CoreStore {
  locale: LocaleEnum = LocaleEnum.ru

  constructor() {
    makeAutoObservable(this, {}, { deep: false })
  }

  setLocale = (locale: LocaleEnum): void => {
    runInAction(() => {
      this.locale = locale
    })
  }

  hydrate(initialData: ICoreStore): void {
    if (initialData) {
      this.locale = initialData.locale || LocaleEnum.ru
    }
  }
}
