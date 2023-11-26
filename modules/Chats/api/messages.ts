import { GET, POST } from 'Core/api/REST'
import { CreateMessageParams, MessageRaw } from './types'

const getApiPath = (slug: string): string => {
  return `${process.env.NEXT_PUBLIC_API_URL}api/messages/${slug}`
}

export const createMessage = async ({
  content,
  chat,
  bot,
  sender,
}: CreateMessageParams): Promise<MessageRaw> => {
  const { data, success } = await POST(getApiPath(''), {
    chat,
    sender,
    bot,
    content,
  })

  if(!success) {
    throw new Error('something went wrong while sending your message')
  }

  return data
}

export const getMessages = async (
  chatId: string,
): Promise<{ data: MessageRaw[]; found: boolean }> => {
  const { data, success } = await GET(getApiPath(chatId))
  if (!success) {
    return { data: [], found: false }
  }
  return { data, found: true }
}

export const createBotReply = async ({
  content,
  chat,
  bot,
  sender,
}: CreateMessageParams): Promise<MessageRaw> => {
  const { data, success } = await POST(getApiPath('bot/'), {
    chat,
    sender,
    bot,
    content,
  })

  if(!success) {
    throw new Error('something went wrong while sending your message')
  }

  return data
}
