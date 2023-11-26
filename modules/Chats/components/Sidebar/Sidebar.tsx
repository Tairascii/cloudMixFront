import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import clsx from 'clsx'
import { useStore } from 'settings/stores'
import { observer } from 'mobx-react'
import styles from './Sidebar.module.scss'
import { Chatline } from './parts/Chatline'
import { convertRawDate } from 'modules/Chats/utils/convertRawDate'
import { CreateChatModal } from '../CreateChatModal'

interface SidebarProps {
  className?: string
}

const Sidebar: FC<SidebarProps> = ({ className }) => {
  const { t } = useTranslation()
  const {
    chats: { chats, chatsCount, createChat, loadChats },
  } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => loadChats(), 3000)
    return (): void => clearInterval(intervalId)
  }, [])

  return (
    <div className={clsx(styles.block, className)}>
      <div className={styles.totalMessages}>
        <span className={styles.totalMessagesText}>
          {t('common:messagesNumber', { cnt: chatsCount })}
        </span>
      </div>
      <div className={styles.user}>
        {chats?.map((item) => {
          const unreadCount = item.lastMessage?.readStatus === false ? 1 : 0
          const time = convertRawDate(item.lastMessage?.timestamp)
          return (
            <Link
              href={String(item.id)}
              shallow
              className={styles.chatLink}
              key={item.id}
            >
              <Chatline
                userName={item.bot.name}
                lastMessage={item.lastMessage?.content ?? 'No messages yet'}
                lastMessageTime={time}
                unreadCount={unreadCount}
                isActive={false}
              />
            </Link>
          )
        })}
      </div>
      <div className={styles.createNewChatWrapper}>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.createNewChat}
        >
          {t('createNewChatWithPlus')}
        </button>
      </div>
      <CreateChatModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onSubmit={createChat}
      />
    </div>
  )
}

export default observer(Sidebar)
