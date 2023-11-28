import { FC } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Page } from 'Core/components/Page'
import { useClientUserAgent } from 'Core/HOCs/withUserAgent'
import { useTranslation } from 'next-i18next'
import { getLocaleFromCity } from 'Core/utils/getLocaleFromCity'
import Link from 'next/link'
import Image from 'next/image'
import { UrlEnums } from 'Core/enums/UrlEnums'
import styles from 'styles/pages/index.module.scss'


const Custom404Page: FC = () => {
  const ua = useClientUserAgent()
  const { t } = useTranslation()

  return (
    <Page
      isMobile={ua?.isMobile}
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

export async function getStaticProps(initialState) {
  const locale = getLocaleFromCity(initialState.locale)
  const localeProps = await serverSideTranslations(locale, ['main', 'common'])
  return {
    props: { ...localeProps },
  }
}

export default Custom404Page
