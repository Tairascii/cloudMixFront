import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withSSPCities } from 'Core/HOCs/withSSPCities'
import { Page } from 'Core/components/Page'
import { getUserAgent } from 'Core/HOCs/withUserAgent'
import { getFullUrl } from 'Core/utils/getFullUrl'
import { UserAgent } from 'Core/HOCs/withUserAgent/constants'
import { useTranslation } from 'next-i18next'
import { compose } from 'recompose'
import { observer } from 'mobx-react'
import { ICoreStore } from 'Core/stores/types'
import { defaultCity } from 'Core/constants'
import { Sidebar } from 'modules/Chats/components/Sidebar'
import { ChatMessages } from 'modules/Chats/components/ChatMessages'
import styles from 'styles/pages/index.module.scss'
import { useStore } from 'settings/stores'

interface HomeProps {
  core: ICoreStore
  ua: UserAgent
  url: string
}

const Home: FC<HomeProps> = ({ url, ua }) => {
  const {
    core: { locale },
  } = useStore()
  const seoLink = {
    href: url,
    rel: 'canonical',
  }
  const { t } = useTranslation()

  // TODO switch to admin panel or smth
  const metaTags = [
    {
      name: 'og:url',
      content: url,
    },
    {
      name: 'description',
      content: t('common:metaDescription'),
    },
    {
      name: 'og:description',
      content: t('common:metaDescription'),
    },
    {
      name: 'og:title',
      content: t('common:metaTitle', {
        city: defaultCity.city_name[locale === 'en' ? 'en' : 'ru'],
      }),
    },
    {
      name: 'og:locale',
      content: `${locale}_KZ`,
    },
    {
      name: 'og:image',
      content:
        'https://static.tildacdn.com/tild6435-6530-4232-b435-313334663631/favicon.svg',
    },
  ]

  return (
    <Page
      isMobile={ua.isMobile}
      isShowFooter
      metaTags={metaTags}
      seoLink={seoLink}
      seoTitle={t('headerTitle')}
      className={styles.block}
    >
      <div className={styles.pageWrapper}>
        <Sidebar className={styles.sideBar} />
        <ChatMessages />
      </div>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = withSSPCities(
  async (context) => {
    const { initialState, req } = context
    const { currentCity, locale } = initialState.core
    const { slug: currentCitySlug } = currentCity
    const ua = getUserAgent(context.req.headers['user-agent'])
    const url = getFullUrl({ city: currentCitySlug, uri: '', locale }, req)

    const localeProps = await serverSideTranslations(locale, ['main', 'common'])

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
        url,
      },
    }
  },
)

export default observer(Home)
