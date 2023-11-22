import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import clsx from 'clsx'
import { useStore } from 'settings/stores'
import { observer } from 'mobx-react'
import { locales } from 'settings/i18n'
import { useRouter } from 'next/router'
import styles from './Sidebar.module.scss'
import { messagesMock } from './mocks'
import { Chatline } from './parts/Chatline'

interface SidebarProps {
  className?: string
}

const Sidebar: FC<SidebarProps> = ({ className }) => {
  const { t } = useTranslation()
  const { core: { locale, setLocale } = { locale: 'ru' } } = useStore()
  const router = useRouter()

  return (
    <div className={clsx(styles.block, className)}>
      <div className={styles.totalMessages}>
        <span className={styles.totalMessagesText}>
          {t('common:messagesNumber', { cnt: 3 })}
        </span>
      </div>
      <div className={styles.user}>
        {messagesMock.map((item) => {
          const formateDate = ''
          return (
            <Link href={item.id} shallow className={styles.chatLink}>
              <Chatline
                key={item.id}
                userName={item.userName}
                lastMessage={item.lastMessage}
                lastMessageTime={'10:41'}
                unreadCount={item.unreadMessagesCount}
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
