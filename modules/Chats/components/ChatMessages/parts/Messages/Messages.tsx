import { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import clsx from 'clsx'
import { useStore } from 'settings/stores'
import { observer } from 'mobx-react'
import { locales } from 'settings/i18n'
import { useRouter } from 'next/router'
import styles from './Messages.module.scss'
import Image from 'next/image'

interface MessagesProps {
  className?: string
  messages: Message[]
}

const Messages: FC<MessagesProps> = ({ className, messages }) => {
  const { t } = useTranslation()

  return (
    <div className={clsx(styles.block, className)}>
      {messages.map((item) => {
        return (
          <div
            key={item.id}
            className={clsx(styles.bubble, {
              [styles.own]: item.userId === '1',
            })}
          >
            <span className={styles.messageText}>{item.text}</span>
            <span className={styles.messageTime}>{item.timeStamp}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Messages
