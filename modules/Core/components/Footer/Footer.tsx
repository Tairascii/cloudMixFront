import { FC } from 'react'
import { Trans, useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FooterProps } from './types'
import styles from './Footer.module.scss'

const Footer: FC<FooterProps> = ({}) => {
  const { t } = useTranslation()
  return (
    <footer className={styles.block}>
     
    </footer>
  )
}

export default Footer
