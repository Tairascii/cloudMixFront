import { CreateClientReturn, SSRConfig, TFunction } from 'next-i18next'
import { createConfig } from 'next-i18next/dist/commonjs/config/createConfig'
import { default as createClient } from 'next-i18next/dist/commonjs/createClient/node'

export async function getServerSideT(config: SSRConfig): Promise<TFunction> {
  const internalConfig = createConfig({
    ...config._nextI18Next?.userConfig,
    lng: config._nextI18Next?.initialLocale,
  })
  const r: CreateClientReturn = await createClient(internalConfig)
  // @ts-ignore
  const t = await r.i18n.init(r.initPromise)
  return t
}
