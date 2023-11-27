export const mockChats: Chat[] = [
  {
    id: 1,
    user: 101,
    bot: {
      id: 201,
      name: 'BotA',
    },
    lastMessage: {
      id: 1001,
      chatId: 1,
      senderId: 101,
      botId: 201,
      isFromBot: false,
      content: 'Hello!',
      timestamp: '2023-01-01T12:00:00Z',
      readStatus: true,
    },
  },
  {
    id: 2,
    user: 102,
    bot: {
      id: 202,
      name: 'BotB',
    },
    lastMessage: {
      id: 1002,
      chatId: 2,
      senderId: 102,
      botId: 202,
      isFromBot: true,
      content: 'Hi there!',
      timestamp: '2023-01-02T15:30:00Z',
      readStatus: false,
    },
  },
]
