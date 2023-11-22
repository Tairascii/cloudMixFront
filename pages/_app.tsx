import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'mobx-react'
import { useStoreInit } from 'settings/stores'
import 'styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const { initialState } = pageProps
  const stores = useStoreInit(initialState)
  return (
    <Provider {...stores}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default appWithTranslation(MyApp)
