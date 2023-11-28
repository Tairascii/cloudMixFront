import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withSSPCities } from 'Core/HOCs/withSSPCities'
import { Page } from 'Core/components/Page'
import { getUserAgent } from 'Core/HOCs/withUserAgent'
import { UserAgent } from 'Core/HOCs/withUserAgent/constants'
import { useTranslation } from 'next-i18next'
import { observer } from 'mobx-react'
import Image from 'next/image'
import { ICoreStore } from 'Core/stores/types'
import Link from 'next/link'
import { UrlEnums } from 'Core/enums/UrlEnums'
import styles from 'styles/pages/index.module.scss'

interface HomeProps {
  core: ICoreStore
  ua: UserAgent
  url: string
}

const Home: FC<HomeProps> = ({ ua }) => {
  const { t } = useTranslation()

  return (
    <Page
      isMobile={ua.isMobile}
      isShowFooter
      seoTitle={t('headerTitle')}
      isShowHeader={false}
    >
      <div className={styles.block}>
        <div className={styles.background}>
          <div className={styles.logo}>
            <Image
              src='/images/icons/icon.svg'
              alt='bult'
              width={42}
              height={42}
            />
            <Image
              src='/images/icons/CloudMix.svg'
              alt='bult'
              width={97}
              height={42}
            />
          </div>
        </div>
        <div className={styles.linkWrapper}>
          <Link href={`${UrlEnums.CHATS}/w`} className={styles.goToChat}>
            {t('goToChats')}
          </Link>
        </div>
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
