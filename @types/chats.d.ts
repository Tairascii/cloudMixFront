declare interface Message {
  id: number
  chatId: number
  senderId: number
  botId: number
  isFromBot: boolean
  content: string
  timestamp: string
  readStatus: boolean
}

declare interface Bot {
  id: number
  name: string
}

declare interface Chat {
  id: number
  user: number
  bot: Bot
  lastMessage: Message
}