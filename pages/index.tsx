import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withSSPCities } from 'Core/HOCs/withSSPCities'
import { Page } from 'Core/components/Page'
import { getUserAgent } from 'Core/HOCs/withUserAgent'
import { UserAgent } from 'Core/HOCs/withUserAgent/constants'
import { useTranslation } from 'next-i18next'
import { observer } from 'mobx-react'
import { ICoreStore } from 'Core/stores/types'
import { defaultCity } from 'Core/constants'
import styles from 'styles/pages/index.module.scss'
import { useStore } from 'settings/stores'

interface HomeProps {
  core: ICoreStore
  ua: UserAgent
  url: string
}

const Home: FC<HomeProps> = ({ ua }) => {
  const {
    core: { locale },
  } = useStore()
  const { t } = useTranslation()

  return (
    <Page
      isMobile={ua.isMobile}
      isShowFooter
      seoTitle={t('headerTitle')}
      className={styles.block}
    >
      <div className={styles.pageWrapper}>
        main
      </div>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = withSSPCities(
  async (context) => {
    const { initialState } = context
    const { locale } = initialState.core
    const ua = getUserAgent(context.req.headers['user-agent'])

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
      },
    }
  },
)

export default observer(Home)
