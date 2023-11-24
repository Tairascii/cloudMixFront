export interface MessageRaw {
  id: string
  chat_id: string
  sender_id: string
  bot_id: string
  content: string
  timestamp: string
  read_status: boolean
  is_from_bot: boolean
}

export interface ChatRaw {
  id: string
  user_id: string
  bot: Bot
  last_message: MessageRaw
}

export interface CreateMessageParams {
  bot: number
  chat: number
  sender: number
  content: string
}
