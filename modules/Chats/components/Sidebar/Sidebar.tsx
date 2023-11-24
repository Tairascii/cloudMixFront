import { FC, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import clsx from 'clsx'
import { useStore } from 'settings/stores'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import styles from './Sidebar.module.scss'
import { Chatline } from './parts/Chatline'
import { convertRawDate } from 'modules/Chats/utils/convertRawDate'

interface SidebarProps {
  className?: string
}

const Sidebar: FC<SidebarProps> = ({ className }) => {
  const { t } = useTranslation()
  const {
    chats: { chats, chatsCount },
  } = useStore()

  return (
    <div className={clsx(styles.block, className)}>
      <div className={styles.totalMessages}>
        <span className={styles.totalMessagesText}>
          {t('common:messagesNumber', { cnt: chatsCount })}
        </span>
      </div>
      <div className={styles.user}>
        {chats.map((item) => {
          const unreadCount = item.lastMessage.readStatus ? 0 : 1
          const time = convertRawDate(item.lastMessage.timestamp)
          return (
            <Link
              href={String(item.id)}
              shallow
              className={styles.chatLink}
              key={item.id}
            >
              <Chatline
                userName={item.bot.name}
                lastMessage={item.lastMessage.content}
                lastMessageTime={time}
                unreadCount={unreadCount}
                isActive={false}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default observer(Sidebar)
