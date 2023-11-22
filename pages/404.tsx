import { FC } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Page } from 'Core/components/Page'
import { useClientUserAgent } from 'Core/HOCs/withUserAgent'
import { useTranslation } from 'next-i18next'
import { useStore } from 'settings/stores'
import { observer } from 'mobx-react'
import { getLocaleFromCity } from 'Core/utils/getLocaleFromCity'
import { ICoreStore } from 'Core/stores/types'
import Link from 'next/link'
import Image from 'next/image'
import { UrlEnums } from 'Core/enums/UrlEnums'
import clsx from 'clsx'
import styles from 'styles/pages/404Page.module.scss'

interface Custom404PageProps {
  core: ICoreStore
}

const Custom404Page: FC<Custom404PageProps> = () => {
  const ua = useClientUserAgent()
  const {
    core: { locale },
  } = useStore()
  const { t } = useTranslation()
  const NUMBER_HEIGHT = ua?.isMobile ? 130 : 260
  const NUMBER_WIDTH = ua?.isMobile ? 106 : 212
  // TODO switch to admin panel or smth
  const metaTags = [
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
      content: 'yo',
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
      isMobile={ua?.isMobile}
      isShowFooter
      metaTags={metaTags}
      seoTitle={t('common:404PageNotFound')}
    >
      <div className={styles.block}>
        <div className={styles.images}>
          <Image
            alt='logo'
            className={clsx(styles.number, styles.first)}
            height={NUMBER_HEIGHT}
            quality={100}
            src='/images/common/4_0000.png'
            width={NUMBER_WIDTH}
          />
          <Image
            alt='logo'
            className={clsx(styles.number, styles.second)}
            height={NUMBER_HEIGHT}
            quality={100}
            src='/images/common/0_0000.png'
            width={NUMBER_WIDTH}
          />
          <Image
            alt='logo'
            className={clsx(styles.number, styles.third)}
            height={NUMBER_HEIGHT}
            quality={100}
            src='/images/common/4_0000.png'
            width={NUMBER_WIDTH}
          />
        </div>
        <span className={styles.text}>{t('common:pageNotFound')}</span>
        <Link className={styles.button} href={UrlEnums.MAIN}>
          {t('common:toMainPage')}
        </Link>
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

export default observer(Custom404Page)
