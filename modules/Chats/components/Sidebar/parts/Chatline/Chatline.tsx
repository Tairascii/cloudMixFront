import { FC } from 'react'
import clsx from 'clsx'
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
