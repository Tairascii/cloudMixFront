import { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import clsx from 'clsx'
import { useStore } from 'settings/stores'
import { observer } from 'mobx-react'
import { locales } from 'settings/i18n'
import { useRouter } from 'next/router'
import styles from './ChatMessages.module.scss'
import Image from 'next/image'
import { Messages } from './parts/Messages'
import { messagesMock } from './parts/messagesMock'

interface ChatMessagesProps {
  className?: string
}

const ChatMessages: FC<ChatMessagesProps> = ({ className }) => {
  const { t } = useTranslation()
  const { core: { locale, setLocale } = { locale: 'ru' } } = useStore()
  const [text, setText] = useState('')
  const router = useRouter()

  const onClick = (e) => {
    e.preventDefault()
  }

  const onChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div className={clsx(styles.block, className)}>
      <div className={styles.header}>
        <span className={styles.contact}>Aslan</span>
        <span className={styles.status}>{t('online')}</span>
      </div>
      <div className={styles.chat}>
        <Messages messages={messagesMock} />
      </div>
      <div className={styles.fieldWrapper} >
      <textarea
        className={styles.field}
        placeholder={t('writeAMessage') as string}
        onChange={onChange}
        value={text}
        onSubmit={onClick}
      />
      <button
        className={clsx(styles.sendMessage, {
          [styles.allowed]: text.length,
        })}
        disabled={!text}
        onClick={onClick}
      >
        <svg
          width='16'
          height='16'
          viewBox='0 0 22 22'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1.58598 0.579526C1.46043 0.516732 1.31978 0.490434 1.18002 0.503623C1.04026 0.516813 0.907013 0.568961 0.795428 0.654135C0.683843 0.739308 0.598401 0.854089 0.548822 0.98542C0.499243 1.11675 0.487518 1.25936 0.51498 1.39703L2.61948 8.67203C2.65872 8.8076 2.73542 8.92935 2.84076 9.02328C2.9461 9.11721 3.07581 9.17952 3.21498 9.20303L11.75 10.6325C12.152 10.712 12.152 11.288 11.75 11.3675L3.21498 12.797C3.07581 12.8205 2.9461 12.8828 2.84076 12.9768C2.73542 13.0707 2.65872 13.1925 2.61948 13.328L0.51498 20.603C0.487518 20.7407 0.499243 20.8833 0.548822 21.0146C0.598401 21.146 0.683843 21.2607 0.795428 21.3459C0.907013 21.4311 1.04026 21.4832 1.18002 21.4964C1.31978 21.5096 1.46043 21.4833 1.58598 21.4205L21.086 11.6705C21.2104 11.6082 21.315 11.5124 21.3881 11.394C21.4612 11.2756 21.4999 11.1392 21.4999 11C21.4999 10.8609 21.4612 10.7244 21.3881 10.606C21.315 10.4876 21.2104 10.3919 21.086 10.3295L1.58598 0.579526Z'
            fill={text.length ? '#FFF' : '#B4B1B9'}
          />
        </svg>
      </button>
      </div>
      
    </div>
  )
}

export default observer(ChatMessages)