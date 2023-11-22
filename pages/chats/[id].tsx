import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { withSSPCities } from 'Core/HOCs/withSSPCities'
import { Page } from 'Core/components/Page'
import { getUserAgent } from 'Core/HOCs/withUserAgent'
import { getFullUrl } from 'Core/utils/getFullUrl'
import { UserAgent } from 'Core/HOCs/withUserAgent/constants'
import { useTranslation } from 'next-i18next'
import { useStore } from 'settings/stores'
import { observer } from 'mobx-react'
import { defaultCity } from 'Core/constants'
import { isEmptyObj } from 'Core/utils/isEmptyObj'

interface ChatsPageProps {
  ua: UserAgent
  url: string
}

const ChatsPage: FC<ChatsPageProps> = ({
  ua,
}) => {
  const { core: { locale } = { locale: 'ru' } } = useStore()
 
  const { t } = useTranslation()

  return (
    <Page
      isMobile={ua.isMobile}
      isShowFooter
      seoTitle={t('common:metaTitle', {
        city: defaultCity.city_name[locale === 'en' ? 'en' : 'ru'],
      })}
    >
      <div></div>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = withSSPCities(
  async ({ initialState, req }) => {
    const ua = getUserAgent(req.headers['user-agent'])
    try {
      const { locale } = initialState.core

      const localeProps = await serverSideTranslations(locale, [
        'main',
        'common',
      ])

      return {
        props: {
          ...localeProps,
          initialState: {
            ...initialState,
            core: {
              ...initialState.core,
            },
          },
          ua,
        },
      }
    } catch (e) {
      return {
        props: { initialState, isMobile: ua.isMobile },
        notFound: true,
      }
    }
  },
)

export default observer(ChatsPage)
