import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useStore } from 'settings/stores'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { HeaderProps } from './types'
import styles from './Header.module.scss'

const Header: FC<HeaderProps> = ({}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.block}>
      <div className={styles.logo}>
        <Image src='/images/icons/icon.svg' alt='bult' width={42} height={42}/>
        <Image src='/images/icons/CloudMix.svg' alt='bult' width={97} height={42}/>
      </div>
      <div className={styles.user}>
        <span className={styles.userName}>Samurai Meow</span>
        <button className={styles.logoutButton}>{t('logout')}</button>
      </div>
    </div>
  )
}

export default observer(Header)
