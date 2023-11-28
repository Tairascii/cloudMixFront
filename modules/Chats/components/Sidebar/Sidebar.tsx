import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import clsx from 'clsx'
import { useStore } from 'settings/stores'
import { observer } from 'mobx-react'
import { convertRawDate } from 'modules/Chats/utils/convertRawDate'
import { Chatline } from './parts/Chatline'
import { CreateChatModal } from '../CreateChatModal'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
  setIsChatOpen: (value: boolean) => void
  isMobile: boolean
}

const Sidebar: FC<SidebarProps> = ({ className, setIsChatOpen, isMobile }) => {
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
          {t('common:messagesNumber', { cnt: chatsCount ?? 0 })}
        </span>
      </div>
      <div className={styles.user}>
        {chats?.map((item) => {
          // const unreadCount = item.lastMessage?.readStatus === false ? 1 : 0
          const time = convertRawDate(item.lastMessage?.timestamp)
          return (
            <Link
              href={String(item.id)}
              shallow
              className={styles.chatLink}
              key={item.id}
              onClick={() => {
                if (isMobile) setIsChatOpen(true)
              }}
            >
              <Chatline
                userName={item.bot.name}
                lastMessage={item.lastMessage?.content ?? t('noMessages')}
                lastMessageTime={time}
                unreadCount={0}
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
