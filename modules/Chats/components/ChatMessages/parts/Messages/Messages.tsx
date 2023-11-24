import { FC, useEffect, useRef } from 'react'
import clsx from 'clsx'
import styles from './Messages.module.scss'
import { convertRawDate } from 'modules/Chats/utils/convertRawDate'

interface MessagesProps {
  className?: string
  messages: Message[]
}

const Messages: FC<MessagesProps> = ({ className, messages }) => {
  return (
    <div className={clsx(styles.block, className)}>
      {messages?.map((item) => {
        return (
          <div
            key={item.id}
            className={clsx(styles.bubble, {
              [styles.own]: !item.isFromBot,
            })}
          >
            <span className={styles.messageText}>{item.content}</span>
            <span className={styles.messageTime}>{convertRawDate(item.timestamp)}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Messages
