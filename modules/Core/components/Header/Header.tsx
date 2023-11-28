import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useStore } from 'settings/stores'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { locales } from 'settings/i18n'
import { cityWithLocale } from 'Core/utils/cityWithLocale'
import { LocaleEnum } from 'Core/stores/types'
import { HeaderProps } from './types'
import { UrlEnums } from 'Core/enums/UrlEnums'
import styles from './Header.module.scss'

const Header: FC<HeaderProps> = ({}) => {
  const { t } = useTranslation()
  const { core: { locale, setLocale } = { locale: 'ru' } } = useStore()
  const router = useRouter()

  return (
    <div className={styles.block}>
      <Link href={UrlEnums.MAIN}>
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
      </Link>
      <div className={styles.rightSide}>
        <div className={styles.localeWrapper}>
          {locales
            .filter((currLocale) => currLocale !== locale)
            .map((currLocale) => (
              <Link
                key={currLocale}
                className={styles.locale}
                href={router.asPath}
                locale={cityWithLocale('almaty', currLocale)}
              >
                <button
                  className={styles.localeButton}
                  onClick={(): void => {
                    if (setLocale) setLocale(currLocale as LocaleEnum)
                  }}
                >
                  {currLocale.toLocaleUpperCase()}
                </button>
              </Link>
            ))}
        </div>
        <div className={styles.user}>
          <span className={styles.userName}>Samurai Meow</span>
          <button className={styles.logoutButton}>{t('logout')}</button>
        </div>
      </div>
    </div>
  )
}

export default observer(Header)
