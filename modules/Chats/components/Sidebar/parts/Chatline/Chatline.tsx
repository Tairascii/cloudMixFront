import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import styles from './Chatline.module.scss'

interface ChatlineProps {
  className?: string
  userName: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isActive: boolean
}

const Chatline: FC<ChatlineProps> = ({
  className,
  userName,
  lastMessage,
  unreadCount,
  lastMessageTime,
  isActive,
}) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div
      className={clsx(styles.block, className, { [styles.active]: isActive })}
    >
      <div className={styles.user}>
        <span className={styles.userName}>{userName}</span>
        <span className={styles.lastMessage}>{lastMessage}</span>
      </div>
      <div className={styles.messageInfo}>
        {!!unreadCount && (
          <span className={styles.unreadCount}>{unreadCount}</span>
        )}
        <span className={styles.lastMessageTime}>{lastMessageTime}</span>
      </div>
    </div>
  )
}

export default Chatline
