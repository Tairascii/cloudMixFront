import { FC, useState } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withSSPCities } from 'Core/HOCs/withSSPCities'
import { Page } from 'Core/components/Page'
import { getUserAgent } from 'Core/HOCs/withUserAgent'
import { UserAgent } from 'Core/HOCs/withUserAgent/constants'
import { useTranslation } from 'next-i18next'
import { observer } from 'mobx-react'
import { Sidebar } from 'modules/Chats/components/Sidebar'
import { ChatMessages } from 'modules/Chats/components/ChatMessages'
import { getAllChats } from 'modules/Chats/api/chats'
import { keysToCamel } from 'Core/utils/keysToCamel'
import { getMessages } from 'modules/Chats/api/messages'
import styles from 'styles/pages/chats.module.scss'

interface ChatsPageProps {
  ua: UserAgent
  url: string
}

const ChatsPage: FC<ChatsPageProps> = ({ ua }) => {
  const { t } = useTranslation()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const shouldShowSidebar = ua.isDesktop || (ua.isMobile && !isChatOpen)
  const shouldShowChat = ua.isDesktop || (ua.isMobile && isChatOpen)

  return (
    <Page isMobile={ua.isMobile} seoTitle={t('headerTitle')}>
      <div className={styles.pageWrapper}>
        {shouldShowSidebar && (
          <Sidebar
            className={styles.sideBar}
            setIsChatOpen={setIsChatOpen}
            isMobile={ua.isMobile}
          />
        )}
        {shouldShowChat && (
          <ChatMessages setIsChatOpen={setIsChatOpen} isMobile={ua.isMobile} />
        )}
      </div>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = withSSPCities(
  async ({ initialState, req, query }) => {
    const ua = getUserAgent(req.headers['user-agent'])
    try {
      const { locale } = initialState.core

      const localeProps = await serverSideTranslations(locale, [
        'main',
        'common',
      ])

      const [chatsPromise, messagesPromise] = [
        getAllChats(),
        getMessages(query.id),
      ]

      const [chats, messages] = await Promise.all([
        chatsPromise,
        messagesPromise,
      ])

      return {
        props: {
          ...localeProps,
          initialState: {
            ...initialState,
            core: {
              ...initialState.core,
            },
            chats: keysToCamel(chats) ?? [],
            messages: {
              messages: keysToCamel(messages.data),
              isChatSelected: messages.found,
            },
          },
          ua,
        },
      }
    } catch (e) {
      return {
        props: { initialState, isMobile: ua.isMobile },
        notFound: true,
      }
    }
  },
)

export default observer(ChatsPage)
