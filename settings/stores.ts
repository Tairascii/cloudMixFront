import { MobXProviderContext, enableStaticRendering } from 'mobx-react'
import { useContext, useMemo } from 'react'
import { CoreStore } from 'Core/stores'

const isServer = typeof window === 'undefined'
enableStaticRendering(isServer)

let store: any = null

export class Store {
  core: CoreStore

  constructor() {
    this.core = new CoreStore()
  }

  hydrate(initialData): void {
    Object.entries(initialData).forEach(([key, value]) => {
      if (this.hasOwnProperty(key) && typeof this[key].hydrate === 'function') {
        this[key].hydrate(value)
      }
    })
  }
}

export const initializeStore = (initialData = null) => {
  const _store = store || new Store()

  if (initialData) {
    _store.hydrate(initialData)
  }
  if (isServer) return _store

  if (!store) {
    store = _store
  }

  return _store
}

export const useStoreInit = (initialState): Store =>
  useMemo(() => initializeStore(initialState), [initialState])

export const useStore = (): Store => useContext(MobXProviderContext) as Store
